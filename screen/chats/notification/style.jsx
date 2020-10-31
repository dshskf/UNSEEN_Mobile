import { StyleSheet } from 'react-native'
import { color } from '../../../constant/style'

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    box: {
        flexDirection: 'row',
        width: '100%',
        height: 90,
        justifyContent: 'center',
        position: 'relative',
        borderBottomWidth: 1,
        borderBottomColor: color.border,
    },
    imageBox: {
        width: '20%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    detailsBox: {
        width: '80%',
        height: '100%',
        paddingLeft: '5%',
        justifyContent: 'center',
    },
    detailsMessage: {
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: color.primary,
        marginBottom: '2%'
    },
    message: {
        color: color.primary,
        fontSize: 18
    },
    detailsAds: {

    },
    adsTitle: {
        color: color.grey_1,
    },
    adsDestination: {
    },
    dateBox: {
        position: 'absolute',
        bottom: 5,
        right: 5
    },
    dateText: {
        fontSize: 12,
        color: color.grey_1
    }
})