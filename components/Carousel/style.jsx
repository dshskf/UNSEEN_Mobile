import { StyleSheet, Dimensions } from 'react-native'
import { color } from '../../constant/style'

const width = Dimensions.get('screen').width

export const styles = StyleSheet.create({
    container: {
        flex: 1,
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

})