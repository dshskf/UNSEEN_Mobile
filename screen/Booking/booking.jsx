import React, { useEffect, useState, useRef } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import BookingCard from '../../components/BookingCard/card'
import { useIsFocused } from '@react-navigation/native'

import { get_booking_agency, update_booking_agency } from '../../redux/management/management.action'

import {
    View,
    FlatList,
    RefreshControl,
    Alert
} from 'react-native'

import { styles } from './style'

const BookingScreen = props => {
    const [booking, setBooking] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(null)
    const isFocused = useIsFocused()
    const isFetch = useRef(false)

    useEffect(() => {
        return () => setPage(1)
    }, [isFocused])


    useEffect(() => {
        isFetch.current = false
        fetch()
    }, [page])

    const fetch = async () => {
        const getBooking = await props.get_booking_agency({
            page: page,
            is_mobile: true
        })        
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
        if (payed && !active) {
            Alert.alert(
                null,
                "Activate this tour?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => confirmAction(id) }
                ],
                { cancelable: false }
            );
        } else {
            props.navigation.replace('Tracking', {
                booking_id: id
            })
        }

    }

    const confirmAction = async (request_id) => {
        const dataToSubmit = {
            request_id: request_id,
            action: 'update'
        }

        const post = await props.update_booking_agency({
            form: dataToSubmit,
        })

        if (!post.err) {
            alert("Success!")
        } else {
            alert(post.err)
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
    get_booking_agency: (data) => dispatch(get_booking_agency(data)),
    update_booking_agency: (data) => dispatch(update_booking_agency(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(BookingScreen);