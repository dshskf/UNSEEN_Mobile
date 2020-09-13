import { StyleSheet } from 'react-native'

import { color } from '../../../constant/color'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    inputBox: {
        width: '100%',
        paddingHorizontal: '5%',
        marginBottom: 30
    },
    inputLabel: {
        color: 'rgba(0,0,0,0.7)'
    },
    input: {
        width: '100%',
        height: 50,
        borderRadius: 2,
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: color.border,
        elevation: 1,
        backgroundColor: 'white'
    }
})