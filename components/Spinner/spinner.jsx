import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { color } from '../../constant/style'

const Spinner = props => {
    const { extStyle } = props
    return (
        <View style={{ ...styles.container, ...extStyle }}>
            <ActivityIndicator size="large" color={color.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Spinner