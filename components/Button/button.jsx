import React, { useRef } from 'react'
import { StyleSheet, View, Text, Animated, TouchableWithoutFeedback } from 'react-native'
import { color } from '../../constant/color'
// import {} from ''

const CustomButton = props => {
    const animation = useRef(new Animated.Value(0)).current;
    const { content, handler, style } = props

    const handleAnimation = () => {
        Animated.timing(animation, {
            toValue: animation === 1 ? 0 : 1,
            duration: 1000,
            useNativeDriver: false
        }).start(() => {
            reverseAnimation()
        })
    }

    const reverseAnimation = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start(() => {
            // handleAnimation()
        })
    }


    const boxInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [color.primary, "rgb(224,82,99)"]
    })

    const animatedStyle = {
        backgroundColor: boxInterpolation
    }

    return (
        <TouchableWithoutFeedback onPress={handler}>
            <View>
                <Animated.View style={{ ...styles.button, ...style, ...animatedStyle }} >
                    <Text style={styles.buttonText}>{content}</Text>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: color.primary,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: '15%',
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    }
})

export default CustomButton