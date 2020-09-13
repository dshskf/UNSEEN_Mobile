import { StyleSheet } from 'react-native'

import { color } from '../../../constant/color'

export const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: '14%',
        marginVertical: '5%',
        borderColor: color.border,
        backgroundColor: 'white',
        borderWidth: 1,
        elevation: 3,
        borderRadius: 15,
        flexDirection: 'row',
    },
    boxItem: {
        height: '100%',
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderColor: color.border,
    },
    boxIcon: {
        fontSize: 20,
        color: color.primary,
        borderWidth: 1,
        padding: 12,
        borderColor: color.primary,
        borderRadius: 14
    },
    boxLabel: {
        color: 'rgba(0,0,0,0.5)',
        fontSize: 12,
        marginVertical: '5%'
    }
})