import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import { AirbnbRating } from 'react-native-ratings';

import { API } from '../../../constant/request'
import { styles } from './style'

const ToursItem = props => {
    let { id, image, title, username, destination, start_date, rating, parentProps, navScreen } = props
    // image = API + image[0].replace('\\', '/')
    start_date = start_date.split('T')[0]
    title = title.length > 18 ? title.substring(0, 17) + '...' : title

    return (
        <TouchableOpacity
            activeOpacity={.6}
            onPress={() => parentProps.navigation.navigate(navScreen, { adsId: id })}
        >
            <View style={styles.item} >
                <View style={styles.imageBox}>
                    <Image style={styles.image} source={{ uri: image[0] }} />
                </View>
                <View style={styles.contentBox}>
                    <Text style={styles.contentTitle}>{title}</Text>
                    <Text style={styles.contentName}>{username}</Text>
                    <Text style={styles.contentDestination}>New York</Text>
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
        </TouchableOpacity>
    )
}

export default ToursItem