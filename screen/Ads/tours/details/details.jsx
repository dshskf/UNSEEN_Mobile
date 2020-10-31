import React, { useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, Dimensions } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';


const ToursDetails = props => {
    useEffect(() => {
        const { adsId } = props.route.params
    }, [])

    const data = [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree", // Network image
    ]

    return (
        <View style={{ flex: 1 }}>            
            {/* <Text>LOL</Text> */}
            <ScrollView
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ flex: 1, width: Dimensions.get('screen').width }}>
                {
                    data.map(img => (
                        <Image key={img} source={{ uri: img }} style={{ width: Dimensions.get('screen').width, height: 200 }} />
                    ))
                }
            </ScrollView>
        </View>
    )
}


export default ToursDetails
