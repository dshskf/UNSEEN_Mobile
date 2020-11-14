import { StyleSheet, StatusBar, Dimensions } from 'react-native'
import { color } from '../../../constant/style'


export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    preventer: {
        height: StatusBar.currentHeight,
        backgroundColor: color.primary
    },
    adsBox: {
        height: 80,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        flexDirection: 'row',
        marginBottom: 10,
    },
    adsImage: {
        width: '25%',
        height: '100%',
        justifyContent: 'center',
    },
    adsDetails: {
        width: '75%',
        height: '100%',
        justifyContent: 'center',
    },
    adsTitle: {
        color: 'white',
        fontSize: 18
    },
    adsDestination: {
        color: '#d4d4d4',
        fontSize: 12
    },
    contactBox: {
        width: '100%',
        height: '10%',
        minHeight: 60,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderBottomColor: color.border,
        borderBottomWidth: 1,
    },
    contactExit: {
        width: '10%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    contactImage: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        paddingLeft: 20,
    },
    contactDetails: {
        width: '60%',
        height: '100%',
        justifyContent: 'center',
    },
    exitIcon: {
        color: color.grey_1,
        fontSize: 28
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 25,
    },
    nameText: {
        color: color.primary,
        fontSize: 18
    },
    statusText: {
        alignSelf: 'flex-start',
        width: '30%',
        backgroundColor: color.grey_1,
        borderRadius: 10,
        paddingLeft: '5%',
        color: 'white',
        fontSize: 12
    },
    flatlistBox: {
        flex: 1,
        width: '100%',        
    },
    box: {
        width: '100%',
        paddingHorizontal: '5%',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    messageBox: {
        alignSelf: 'flex-start',
        maxWidth: '80%',
        paddingVertical: 10,
        paddingHorizontal: '5%',
        borderRadius: 4,
        backgroundColor: color.grey_1,
        position: 'relative'
    },
    message: {
        color: 'white'
    },
    messageDate: {
        fontSize: 12,
        color: color.grey_1,
        position: 'absolute',
        right: 0,
        bottom: -17,
    },
    inputBox: {
        width: '100%',
        height: 50,        
        flexDirection: 'row',
        paddingLeft: 10,
        backgroundColor: 'white',
    },
    input: {
        width: '85%',
        height: '100%',
        backgroundColor: 'white',
    },
    sendBox: {
        width: '15%',
        height: '100%',
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButton: {
        color: 'white',
        fontSize: 20
    }
})