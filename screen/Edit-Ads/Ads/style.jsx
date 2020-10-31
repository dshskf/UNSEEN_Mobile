import { StyleSheet } from 'react-native'
import { color } from '../../../constant/style'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '2%'
    },
    content: {
        flex: 1,
        padding: '3%'
    },
    addBox: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 50,
        backgroundColor: color.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addText: {
        color: 'white',
        fontSize: 14,
    }
})