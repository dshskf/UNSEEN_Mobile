import React from 'react'
import { View, Text, Image } from 'react-native'

import { AirbnbRating } from 'react-native-ratings';

import { API } from '../../../constant/link'
import { styles } from './style'

const ToursItem = props => {
    let { image, title, username, destination, start_date, rating } = props
    image = API + image[0].replace('\\', '/')
    start_date = start_date.split('T')[0]

    return (
        <View style={styles.item}>
            <View style={styles.imageBox}>
                <Image style={styles.image} source={{ uri: image }} />
            </View>
            <View style={styles.contentBox}>
                <Text style={styles.contentTitle}>{title}</Text>
                <Text style={styles.contentName}>{username}</Text>
                <Text style={styles.contentDestination}>{destination}</Text>
                <Text style={styles.contentDate}>Start: {start_date}</Text>
                <View style={styles.ratingBox}>
                    <AirbnbRating
                        count={5}
                        reviewSize={0}
                        defaultRating={4}
                        isDisabled={true}
                        size={14}
                    />
                </View>
            </View>
        </View>
    )
}

export default ToursItem