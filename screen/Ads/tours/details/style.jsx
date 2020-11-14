import { StyleSheet, Dimensions } from 'react-native'
import { color } from '../../../../constant/style'

const width = Dimensions.get('screen').width
const paddingHorizontal = 15

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerBox: {
        width: width,
        minHeight: 135,
        // height: 120,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: paddingHorizontal,
        position: 'relative'
    },
    headerName: {
        width: '70%',
        color: color.primary,
        fontSize: 22,
    },
    headerPrice: {
        color: color.grey_1,
        fontSize: 18,
        marginVertical: 10
    },
    headerRating: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 5,
        left: paddingHorizontal,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rating: {
    },
    ratingLabel: {
        fontSize: 14,
        color: 'rgba(0,0,0,0.5)',
        fontStyle: 'italic',
        marginLeft: 5
    },
    headerSlot: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: color.grey_1,
        height: 40,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        elevation: 10
    },
    slot: {
        color: 'white',
    },
    destinationBox: {
        // marginTop: 30,
        width: width,
        height: 50,
        backgroundColor: 'white',
        elevation: 4
    },
    destinationScroll: {
        backgroundColor: color.primary,
        paddingHorizontal: paddingHorizontal,        
    },
    destination: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    planeIcon: {
        color: 'white',
        fontSize: 22
    },
    destinationCity: {
        color: 'white',
    },
    destinationDash: {
        color: 'white',
        marginHorizontal: 10,
        fontSize: 22
    },
    descriptionBox: {
        marginTop: 20,
        backgroundColor: 'white',
        padding: paddingHorizontal,
    },
    descriptionText: {
        color: color.grey_2
    },
    actionBox: {
        position: 'absolute',
        bottom: 0,
        width: width,
        height: 60,
        backgroundColor: 'white',
        paddingHorizontal: paddingHorizontal,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionIcon: {
        width: '14%',
        height: '75%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: color.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatIcon: {
        color: color.primary,
    },
    actionSubmit: {
        width: '82%',
        backgroundColor: color.primary,
        height: '75%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitText: {
        color: 'white',
        fontSize: 20,
    }
})