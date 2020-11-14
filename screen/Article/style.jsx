import { StyleSheet } from 'react-native'
import { color } from '../../constant/style'

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: '100%',
        height: '100%'
    },
    focusBox: {
        position: 'absolute',
        bottom: '5%',
        right: '4%',
        backgroundColor: color.primary,
        padding: 10,
        borderRadius: 20
    },
})