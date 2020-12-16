import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, ScrollView, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native'
import { Rating } from 'react-native-ratings';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';

import Carousel from '../../../../components/Carousel/carousel'
import { default as EntypoIcon } from 'react-native-vector-icons/Entypo'
import { default as FAIcon } from 'react-native-vector-icons/FontAwesome'
import { get_tours_agency_detail, post_user_booking } from '../../../../redux/tours/tours.action'
import { userStorage } from '../../../../constant/request'

import { styles } from './style'

const ToursDetails = props => {
    const [tours, setTours] = useState(null)
    const tourId = useRef()

    useEffect(() => {
        (async () => {
            const { adsId } = props.route.params
            tourId.current = adsId

            let post = await props.get_tours_agency_detail({ id: adsId })
            let destination = []

            // Collect City
            post = post.tours
            post.map(t => {
                destination.push({
                    period: t.period,
                    city: t.city_name
                })

            })
            post = post[0]
            post.destination = destination
            setTours(post)
        })()
    }, [])

    const data = [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree", // Network image
    ]

    const sendBookingsRequest = async () => {
        const storage = await userStorage()
        const post = await props.post_user_booking({
            tours_id: tourId.current,
            sender_id: storage.id,
            receiver_id: tours.agencyId,
            is_payed: false,
            is_active: false,
            receiver_type: 'A'
        })
        if (!post.err) {
            alert("Success!")
        } else {
            alert(post.err)
        }
    }

    return (
        tours &&
        <SafeAreaView style={styles.container}>
            <View style={styles.viewBox}>
                <ScrollView style={styles.container}>
                    <Carousel
                        data={data}
                        options={{ height: 320 }}
                    />
                    <View style={styles.headerBox}>
                        <Text style={styles.headerName}>{tours.title}</Text>
                        <Text style={styles.headerPrice}>${tours.cost}</Text>
                        <View style={styles.headerRating}>
                            <Rating
                                type='custom'
                                ratingCount={5}
                                imageSize={16}
                                startingValue={tours.rating}
                                readonly={true}
                                style={styles.rating}
                            />
                            <Text style={styles.ratingLabel}>{tours.total_tours ? tours.total_tours : '0'} Trip</Text>
                        </View>
                        <View style={styles.headerSlot}>
                            <Text style={styles.slot}>Slot: {tours.quota_left}/{tours.quota}</Text>
                        </View>
                    </View>
                    <View style={styles.destinationBox}>
                        <View style={styles.destinationTitleOverlay}></View>
                        <Text style={styles.destinationTitle}>Destinations</Text>
                        {
                            tours.city_name.map((city, i) => {
                                let width = city.length * 12
                                return i !== tours.city_name.length - 1 ?
                                    (
                                        <View key={i}>
                                            <View style={styles.destinationItem}>
                                                <View style={styles.destinationIcon}>
                                                    <FAIcon name="plane" style={styles.planeIcon} />
                                                </View>
                                                <View style={styles.destinationCity}>
                                                    <Text style={styles.citiesText}>{city}</Text>
                                                    <Text style={styles.durationText}>3 days</Text>
                                                </View>
                                            </View>
                                            <Text style={styles.destinationSeparator}>------</Text>
                                        </View>
                                    )
                                    :
                                    (
                                        <View key={i} style={styles.destinationItem}>
                                            <View style={styles.destinationIcon}>
                                                <FAIcon name="plane" style={styles.planeIcon} />
                                            </View>
                                            <View style={styles.destinationCity}>
                                                <Text style={styles.citiesText}>{city}</Text>
                                                <Text style={styles.durationText}>3 days</Text>
                                            </View>

                                        </View>
                                    )
                            })
                        }
                    </View>
                    <View style={styles.descriptionBox}>
                        <Text style={styles.descriptionText}>{tours.description}</Text>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.actionBox}>
                <TouchableOpacity activeOpacity={0.7} style={styles.actionSubmit} onPress={sendBookingsRequest}>
                    <Text style={styles.submitText}>Bookings now</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.actionIcon}>
                    <EntypoIcon name="chat" color="orange" size={20} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({
    get_tours_agency_detail: (data) => dispatch(get_tours_agency_detail(data)),
    post_user_booking: (data) => dispatch(post_user_booking(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ToursDetails);
