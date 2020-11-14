import React, { useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, Dimensions } from 'react-native'
// import Swipeable from 'react-native-gesture-handler/Swipeable';

import { styles } from './style'

const Carousel = props => {
    const { data, options } = props
    const [activeDot, setActiveDot] = useState(0);

    const scrollHandler = ({ nativeEvent }) => {
        setActiveDot(Math.round(nativeEvent.contentOffset.x / Dimensions.get('screen').width))
    }

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
                    data.map(img => (
                        <Image key={img} source={{ uri: img }} style={styles.scrollImage} />
                    ))
                }
            </ScrollView>
            <View style={styles.scrollIndicator}>
                {
                    data.map((data, i) => <Text
                        key={i}
                        style={{ ...styles.indicator, color: i === activeDot ? 'white' : styles.indicator.color, opacity: i === activeDot ? 1 : 0.4 }}
                    >&bull;</Text>)
                }
            </View>
        </View>
    )
}


export default Carousel