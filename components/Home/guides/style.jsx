import { StyleSheet, Dimensions } from 'react-native'
import { color } from '../../../constant/color'


export const styles = StyleSheet.create({
    item: {
        width: '46%',
        height: Dimensions.get('window').height > 920 ? 400 : 250,
        backgroundColor: 'white',
        elevation: 1,
        overflow: 'hidden',
        marginVertical: '2%',
        marginHorizontal: '2%',
    },
    imageBox: {
        width: '100%',
        height: '60%',
    },
    image: {
        width: '100%',
        height: '100%'
    },
    contentBox: {
        paddingLeft: '2%',
        height: '40%',
        width: '100%',
    },
    contentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: color.primary,
        position: 'relative'
    },
    contentName: {
        color: color.border
    },
    contentPrice: {
        color: 'white',
        padding: 8,
        paddingHorizontal: 15,
        fontSize: 12,
        fontWeight: 'bold',
        backgroundColor: color.primary,
        borderTopRightRadius: 20
    },
    bottomBox: {
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        bottom: 0
    },
    ratingBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    ratingStar: {
        paddingVertical: 4
    },
    ratingLabel: {
        fontSize: 10,
        color: 'rgba(0,0,0,0.5)',
        fontStyle: 'italic',
        marginBottom: 3
    }
})