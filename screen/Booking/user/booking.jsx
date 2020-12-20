import React, { useEffect, useState, useRef } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import BookingCard from '../../../components/BookingCard/card'
import { useIsFocused } from '@react-navigation/native'

import { get_booking_user, update_booking_user } from '../../../redux/management/management.action'
import io, { Socket } from 'socket.io-client'

import {
    View,
    FlatList,
    RefreshControl,
    Alert
} from 'react-native'

import { styles } from './style'
import { API } from '../../../constant/link';
import { userStorage } from '../../../constant/request';
import { chats_send_message } from '../../../redux/features/features.action';

const BookingScreen = props => {
    const [booking, setBooking] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(null)

    const isFocused = useIsFocused()
    const isFetch = useRef(false)
    const socketIo = useRef(null)

    const tempBooking = useRef(null)

    useEffect(() => {
        (async () => {
            const storage = await userStorage()
            const socket = io(API)

            socket.emit('join_room', {
                room_id: `${storage.id}-${storage.typeCode}`
            })

            socket.on('new_booking', res => {

                tempBooking.current = tempBooking.current.map(b => {
                    if (res.booking_id === b.id) {
                        alert(b.ads_title + " has been activated!")
                        b.is_active = true
                        return b
                    }
                    return b
                })

                setBooking(tempBooking.current)
            })

            socketIo.current = socket
        })()

        return () => {
            setPage(1)
            return socketIo.current.disconnect()
        }
    }, [isFocused])


    useEffect(() => {
        isFetch.current = false
        fetch()
    }, [page])

    const fetch = async () => {
        const getBooking = await props.get_booking_user({
            page: page,
            is_mobile: true
        })
        tempBooking.current = getBooking.data
        setTotalPage(getBooking.total_page)
        setBooking(getBooking.data)
    }

    const refreshHandler = async () => {
        setRefresh(true)
        await fetch()
        setRefresh(false)
    }

    const handleListPagination = () => {
        if (totalPage && page < totalPage) {
            isFetch.current = true
            setPage(page + 1)
        }
    }

    const loadPaginationSpinner = () => {
        return isFetch.current ? (<Spinner extStyle={styles.footerLoad} />) : null
    }

    const handleConfirm = (id, payed, active) => {
        if (!payed && !active) {
            Alert.alert(
                null,
                "Already pay this tour?",
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: "Delete", onPress: () => deleteAction(id) },
                    { text: "Yes", onPress: () => confirmAction(id) }
                ],
                { cancelable: false }
            );
        } else if (payed && active) {
            // const filter = booking.filter(b => b.id === id)
            props.navigation.replace('Tracking', {
                id: id,
                type: 'bookings'
            })
        }
        return
    }

    const confirmAction = async (request_id) => {
        let selected_booking = booking.filter(b => b.id === request_id)
        selected_booking = selected_booking[0]

        const dataToSubmit = {
            booking_id: request_id,
            tours_id: selected_booking.tours_id,
            action: 'update'
        }

        const post = await props.update_booking_user({
            form: dataToSubmit,
        })

        if (!post.err) {
            const msgData = {
                receiver_id: selected_booking.receiver_id,
                receiver_type: 'A',
                content: `${selected_booking.user_username} has been paid for ${selected_booking.ads_title} tours!`,
                tours_id: selected_booking.tours_id,
                tours_type: 'A'
            }
            await props.chats_send_message({ ...msgData })

            socketIo.current.emit('update_booking', {
                opposite_room: `${selected_booking.sender_id}-A`,
                booking_id: selected_booking.id
            })
            const new_booking = booking.map(b => {
                if (b.id === request_id) {
                    b.is_payed = true
                }
                return b
            })
            tempBooking.current = new_booking
            setBooking(new_booking)
            alert("Success!")
        } else {
            alert(post.err)
        }
    }

    const deleteAction = async (request_id) => {
        let selected_booking = booking.filter(b => b.id === request_id)
        selected_booking = selected_booking[0]

        const dataToSubmit = {
            booking_id: request_id,
            tours_id: selected_booking.tours_id,
            action: 'delete'
        }

        const post = await props.update_booking_user({ form: dataToSubmit, })


        if (!post.err) {
            const new_booking = booking.filter(b => b.id !== request_id)
            setBooking(new_booking)
        }
    }

    const cardScreen = (data) => <BookingCard action={handleConfirm} {...data.item} />

    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={booking}
                renderItem={cardScreen}
                style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={refreshHandler}
                    />
                }
                onEndReached={handleListPagination}
                onEndReachedThreshold={0.1}
                ListFooterComponent={loadPaginationSpinner}
            />
        </View>
    )

}

const mapStateToProps = createStructuredSelector({

})

const mapDispatchToProps = (dispatch) => ({
    get_booking_user: (data) => dispatch(get_booking_user(data)),
    update_booking_user: (data) => dispatch(update_booking_user(data)),
    chats_send_message: (data) => dispatch(chats_send_message(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(BookingScreen);