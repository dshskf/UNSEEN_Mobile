import { StyleSheet, Dimensions } from 'react-native'
import { color } from '../../constant/style'

const width = Dimensions.get('screen').width

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    swiper: {
        height: 220
    },
    scroll: {
        width: width,
        height: '100%',
        position: 'relative',
    },
    scrollImage: {
        width: width,
        height: '100%'
    },
    scrollIndicator: {
        flexDirection: 'row',
        width: width,
        height: 50,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center'
    },
    indicator: {
        fontSize: 50,
        marginHorizontal: 5,
        color: color.grey_1,
    },
    textBox: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: 100,
        bottom: 0,
        padding: 10,
        paddingHorizontal: 20,
        zIndex: 1
    },
    textTitle: {
        color: 'white',
        fontSize: 20
    }
})