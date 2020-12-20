import { StyleSheet, Dimensions } from 'react-native'
import { color } from '../../constant/style'

const width = Dimensions.get('screen').width
const modalRadius = 10

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalOverlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: color.overlay,
        width: width,
        height: '100%',
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBox: {
        minWidth: 280,
        minHeight: 250,
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: modalRadius,
    },
    modalTitle: {
        paddingHorizontal: 10,
        height: 40,
        borderTopLeftRadius: modalRadius,
        borderTopRightRadius: modalRadius,
        backgroundColor: color.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleText: {
        color: 'white',
        fontSize: 18
    },
    titleActionBox: {
        width: 26,
        height: 26,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 13,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleAction: {
        color: 'white',
        fontWeight: 'bold'
    },
    formArea: {
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    formButtonBox: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 80
    },
    formButton: {
        width: '70%',
        paddingVertical: 10,
        backgroundColor: color.primary,
        alignItems: 'center',
        borderRadius: modalRadius
    },
    formButtonText: {
        color: 'white'
    },
})