import React, { useEffect, useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import BookingCard from '../../components/BookingCard/card'

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

    useEffect(() => {
        fetch()
    }, [])

    const fetch = async () => {
        const getBooking = await props.get_booking_agency()
        console.log(getBooking.data)
        setBooking(getBooking.data)
    }

    const refreshHandler = async () => {
        setRefresh(true)
        await fetch()
        setRefresh(false)
    }

    const handleAlertBox = (id, payed, active) => {
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

    const cardScreen = (data) => <BookingCard action={handleAlertBox} {...data.item} />

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
            />
        </View>
    )

}

const mapStateToProps = createStructuredSelector({

})

const mapDispatchToProps = (dispatch) => ({
    get_booking_agency: () => dispatch(get_booking_agency()),
    update_booking_agency: (data) => dispatch(update_booking_agency(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(BookingScreen);