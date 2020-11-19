import { StyleSheet } from 'react-native'
import { color } from '../../constant/style'

const paddingHorizontal = 20

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 15
    },
    cardBox: {
        flex: 1,
        width: '92%',
        height: 360,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 8,
        overflow: 'hidden'
    },
    imageBox: {
        width: '100%',
        height: '40%',        
    },
    image: {
        width: '100%',
        height: '100%',
    },
    titleBox: {
        height: '10%',
        justifyContent: 'center',
        paddingHorizontal: paddingHorizontal,
    },
    title: {
        color: color.grey_1,
        fontSize: 19
    },
    detailBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: '35%',
    },
    detailLeft: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: paddingHorizontal,
        marginTop: 15
    },
    detailRight: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: paddingHorizontal,
        marginTop: 15
    },
    iconBox: {
        justifyContent: 'center',
        width: '30%',
    },
    dataBox: {

    },
    dataTitle: {
        fontSize: 14,
        color: color.grey_1,
        fontWeight: 'bold',
    },
    dataInfo: {
        color: color.grey_2
    },
    detailPrice: {

    },
    buttonBox: {
        backgroundColor: color.primary,
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10
    }
})