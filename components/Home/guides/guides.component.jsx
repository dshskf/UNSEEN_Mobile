import React from 'react'
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Rating } from 'react-native-ratings';
import { formatImage } from '../../../constant/middleware';

import { API } from '../../../constant/request'
import { styles } from './style'

const GuideItem = props => {
    let { image, cost, username, destination, country, rating,parentProps } = props    
    username = username.length > 18 ? username.substring(0, 17) + '...' : username

    return (
        <TouchableOpacity
            style={styles.item}
            activeOpacity={.8}
            onPress={() =>  parentProps.navigation.navigate("GuidesDetails")}
        >
            <View >
                <View style={styles.imageBox}>
                    <Image style={styles.image} source={{ uri: formatImage(image) }} />
                </View>
                <View style={styles.contentBox}>
                    <Text style={styles.contentTitle}>{username}</Text>
                    <Text style={styles.contentCity}>{country}</Text>                    
                    <View style={styles.bottomBox}>
                        <Text style={styles.contentPrice}>Arizona</Text>
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
        </TouchableOpacity>
    )
}

export default GuideItem