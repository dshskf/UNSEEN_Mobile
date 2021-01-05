import { StyleSheet } from 'react-native'
import { color } from '../../constant/style'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    map: {
        width: '100%',
        height: '100%'
    },
    focusBox: {
        position: 'absolute',
        bottom: '5%',
        right: '4%',
        backgroundColor: color.primary,
        padding: 10,
        borderRadius: 20
    },
    itemBox: {
        width: '100%',
        height: 100,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'

    },
    imageBox: {
        width: '30%',
        height: '100%'
    },
    itemImage: {
        width: 110,
        height: '100%'
    },
    textBox: {
        width: '65%',
        height: '100%',
    },
    itemText: {
        fontSize: 14,
        color: color.grey_2
    },
    itemTextHeader: {
        fontSize: 18,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: color.primary
    }
})