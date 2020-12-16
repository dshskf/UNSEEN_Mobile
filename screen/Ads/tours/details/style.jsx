import { StyleSheet, Dimensions } from 'react-native'
import { color } from '../../../../constant/style'

const width = Dimensions.get('screen').width
const height = Dimensions.get('window').height
const paddingHorizontal = 20

const actionBoxHeight = 60

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewBox: {
        height: height - actionBoxHeight,
        width: '100%'
    },
    headerBox: {
        width: width,
        minHeight: 135,
        // height: 120,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: paddingHorizontal,
        position: 'relative',
        elevation: 4,
    },
    headerName: {
        width: '70%',
        color: color.primary,
        fontSize: 22,
        fontWeight: 'bold'
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
        borderBottomLeftRadius: 8,
        elevation: 10
    },
    slot: {
        color: 'white',
    },
    destinationBox: {
        paddingVertical: 20,
        width: width,
        backgroundColor: 'white',
        marginTop: 20,
        elevation: 4
    },
    destinationTitle: {
        width: 135,
        paddingVertical: 10,
        paddingHorizontal: paddingHorizontal,
        color: 'white',
        backgroundColor: color.primary,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10
    },
    destinationTitleOverlay: {
        width: 130,
        height: 40,
        backgroundColor: color.border,
        position: 'absolute',
        top: 10,
        marginLeft: 5
    },
    destinationItem: {
        width: width,
        height: 60,
        paddingHorizontal: paddingHorizontal,
        flexDirection: 'row'
    },
    destinationIcon: {
        justifyContent: 'center'
    },
    planeIcon: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: color.border,
        width: 40,
        height: 40,
        padding: 10,
        color: color.primary,
        fontSize: 22,
    },
    destinationCity: {
        height: '100%',
        justifyContent: 'center',
        paddingLeft: 20,
    },
    citiesText: {
        color: color.primary,
        fontStyle: 'italic',
    },
    durationText: {
        fontSize: 12,
        color: color.grey_1
    },
    destinationSeparator: {
        width: 40,
        height: 20,
        color: color.primary,
        fontWeight: 'bold',
        fontSize: 20,
        transform: [{ rotateZ: '90deg' }],
        marginLeft: paddingHorizontal + 5,
    },
    descriptionBox: {
        marginTop: 20,
        backgroundColor: 'white',
        padding: paddingHorizontal,
        minHeight: 150,
        elevation: 4,
    },
    descriptionText: {
        color: color.grey_2
    },
    actionBox: {
        position: 'absolute',
        bottom: 0,
        width: width,
        height: actionBoxHeight,
        backgroundColor: 'white',
        paddingHorizontal: paddingHorizontal,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 20
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