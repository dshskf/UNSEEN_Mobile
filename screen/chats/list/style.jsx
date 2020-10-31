import { StyleSheet } from 'react-native'
import { color } from '../../../constant/style'

let imgSize = { width: 55, height: 55 }

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: color.border,
    },
    cardImage: {
        width: '25%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: imgSize.width,
        height: imgSize.height,
        borderRadius: imgSize.width / 2,
    },
    cardDetails: {
        width: '60%',
        padding: 4,
        justifyContent: 'center',
    },
    cardName: {
        fontSize: 20,
        color: color.primary,
    },
    cardMessage: {
        fontSize: 14,
        color: 'grey',
    },
    cardBadges: {
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgesBox: {
        width: 28,
        height: 28,
        backgroundColor: color.primary,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badges: {
        color: 'white',
    }
})