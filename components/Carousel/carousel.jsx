import React, { useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, Dimensions } from 'react-native'
import { formatImage } from '../../constant/middleware';
// import Swipeable from 'react-native-gesture-handler/Swipeable';

import { styles } from './style'

const Carousel = props => {
    const { imageArr, options, isNews } = props
    const [activeDot, setActiveDot] = useState(0);

    const scrollHandler = ({ nativeEvent }) => {
        setActiveDot(Math.round(nativeEvent.contentOffset.x / Dimensions.get('screen').width))
    }

    const tempText = [
        `The Jakarta Post Themed virtual tours to celebrate Jakarta's anniversary`,
        `2021 Destinations That Are PERFECT For Tours!`,
        `Disneyland-News Tomorrowland crowds star tours`
    ]

    return (
        <View style={options}>
            <ScrollView
                pagingEnabled
                horizontal
                scrollEventThrottle={400}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                style={styles.scroll}>
                {
                    imageArr.map((img, index) => (
                        isNews ?
                            <View key={index} style={styles.container}>
                                <View style={styles.textBox}>
                                    <Text style={styles.textTitle}>{tempText[index]}</Text>
                                </View>
                                <Image source={formatImage(img)} style={styles.scrollImage} />
                            </View>
                            :
                            <Image key={index} source={formatImage(img)} style={styles.scrollImage} />
                    ))
                }
            </ScrollView>
            <View style={styles.scrollIndicator}>
                {
                    imageArr.map((img, i) => <Text
                        key={i}
                        style={{ ...styles.indicator, color: i === activeDot ? 'white' : styles.indicator.color, opacity: i === activeDot ? 1 : 0.4 }}
                    >&bull;</Text>)
                }
            </View>
        </View>
    )
}


export default Carousel
