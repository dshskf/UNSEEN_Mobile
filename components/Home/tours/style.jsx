import { StyleSheet, Dimensions } from 'react-native'
import { color } from '../../../constant/color'


export const styles = StyleSheet.create({
    item: {
        width: '100%',
        height: Dimensions.get('window').height > 920 ? 250 : 180,
        backgroundColor: 'white',
        flexDirection: 'row',
        elevation: 1,
        overflow: 'hidden',
        marginVertical: '2%'
    },
    imageBox: {
        width: '40%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    contentBox: {
        marginLeft: '2%',
        width: '60%'
    },
    contentTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: color.primary,
    },
    contentName: {
        color: color.border
    },
    contentDestination: {
        marginTop: '10%',
        color: 'navy'
    },
    contentDate: {
        color: 'rgba(0,0,0,0.5)',
        fontSize: 12
    },
    ratingBox: {
        width: '100%',
        alignItems: 'flex-end',
        paddingRight: '10%',
        marginTop: '8%'
    },
})