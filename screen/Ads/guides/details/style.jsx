import { StyleSheet, Dimensions } from 'react-native'
import { color } from '../../../../constant/style'

const width = Dimensions.get('screen').width
const height = Dimensions.get('window').height
const paddingHorizontal = 20

const actionBoxHeight = 50
const containerHeight = height + 15 - actionBoxHeight

const inputRadius = 4
export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formArea: {
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    formItem: {
        marginVertical: 10
    },
    formPicker: {
        height: 50,
        color: color.grey_1,
        borderRadius: inputRadius,
        marginVertical: 5
    },
    formTitle: {
        color: color.primary,
    },
    dateInputBox: {
        backgroundColor: color.border_2,
        borderWidth: 1,
        borderColor: color.grey_2,
        marginVertical: 5,
        height: 40,
        justifyContent: 'center',
        borderRadius: inputRadius
    },
    dateInput: {
        marginLeft: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: color.border,
        borderRadius: inputRadius,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 5,
        maxHeight: 140
    },
    viewArea: {
        height: containerHeight
    },
    headerBox: {
        width: width,
        minHeight: 135,
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
    ratingLabel: {
        fontSize: 14,
        color: 'rgba(0,0,0,0.5)',
        fontStyle: 'italic',
        marginLeft: 5
    },
    profileBox: {
        backgroundColor: 'white',
        width: width,
        paddingHorizontal: paddingHorizontal,
        paddingVertical: 10,
        marginVertical: 20,
        elevation: 2
    },
    profileColumn: {
        width: '50%'
    },
    profileItem: {
        flexDirection: 'row',
        marginVertical: 10
    },
    profileTitle: {
        width: '25%',
        color: color.primary,
        fontWeight: 'bold'
    },
    profileSeparator: {
        width: '5%'
    },
    profileData: {

    },
    statusBox: {
        borderWidth: 1,
        borderColor: color.border,
        backgroundColor: color.border_2,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    statusFlag: {
        width: 10,
        height: 10,
        backgroundColor: 'green',
        borderRadius: 5
    },
    statusText: {
        marginLeft: 4,
        color: color.grey_1
    },
    descriptionBox: {
        paddingHorizontal: paddingHorizontal,
        paddingVertical: 20,
        backgroundColor: 'white',
        elevation: 4,
        minHeight: 250
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
        elevation: 10
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