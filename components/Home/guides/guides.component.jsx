import React from 'react'
import { View, Image, Text } from 'react-native'
import { Rating } from 'react-native-ratings';

import { API } from '../../../constant/link'
import { styles } from './style'

const GuideItem = props => {
    let { image, cost, username, destination, rating } = props
    image = API + image[0].replace('\\', '/')

    return (
        <View style={styles.item}>
            <View style={styles.imageBox}>
                <Image style={styles.image} source={{ uri: image }} />
            </View>
            <View style={styles.contentBox}>
                <Text style={styles.contentTitle}>{username}</Text>
                <Text style={styles.contentName}>{destination}</Text>
                <View style={styles.bottomBox}>
                    <Text style={styles.contentPrice}>${cost}/h</Text>
                    <View style={styles.ratingBox}>
                        <Rating
                            type='custom'
                            ratingCount={5}
                            imageSize={12}
                            startingValue={4}
                            readonly={true}
                            style={styles.ratingStar}
                        // onFinishRating={this.ratingCompleted                                
                        />
                        <Text style={styles.ratingLabel}>10 Trip</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default GuideItem