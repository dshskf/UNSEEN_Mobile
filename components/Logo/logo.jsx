import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, Keyboard, Animated, TouchableWithoutFeedback } from 'react-native'

import { color } from '../../constant/color'

const LogoComponent = props => {
    const animation = useRef(new Animated.Value(0)).current

    useEffect(() => {
        handleAnimation()
    }, [])

    const handleAnimation = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start(() => {
            // reverseAnimation()
        })
    }

    const imageAnimatedStyle = {
        transform: [{
            rotate: animation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
            })
        }]
    }

    const textAnimatedStyle = {
        opacity: animation,
        transform: [{
            translateX: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [400, 0]
            })
        }]
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.logo}>
                <Animated.Image source={require('../../assets/img/logo.png')} style={[styles.logoImage, imageAnimatedStyle]} />
                <Animated.Text style={[styles.logoText, textAnimatedStyle]}>UNSEEN</Animated.Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    logo: {
        flexDirection: 'row',
        height: 150,
        justifyContent: 'center',
        marginTop: '20%',
        alignItems: 'center'
    },
    logoImage: {
        width: 60,
        height: 60
    },
    logoText: {
        color: color.primary,
        fontSize: 40
    },
})

export default LogoComponent