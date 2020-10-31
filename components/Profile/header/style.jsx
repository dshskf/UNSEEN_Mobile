import { StyleSheet } from 'react-native'
import { color } from '../../../constant/style'

export const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '24%',
        backgroundColor: color.primary,
        justifyContent:'flex-end',
        
    },
    ImageBackground: {
        flex: 1,
        resizeMode: "cover",
        position: 'relative'
    },
    headerContent: {
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '15%',
        height: '70%',
    },
    imageBox: {
        width: 70,
        height: 70,
        left: '10%',
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '90%',
        height: '90%',
        borderRadius: 50,
    },
    nameBox: {
        marginLeft: '7%',
        justifyContent: 'center',
    },
    nameTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 26,
    },
    nameAction: {
        color: color.primary
    },
    actionBox: {
        position: 'absolute',
        top: 0,
        right: '5%',
    },
    actionIcon: {
        fontSize: 25,
        color: 'white'
    },

})
