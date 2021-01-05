import { StyleSheet } from 'react-native'
import { color } from '../../../constant/style'

const inputRadius = 4

export const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    textInput: {
        borderWidth: 1,
        borderColor: color.border,
        borderRadius: inputRadius,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 5,
        maxHeight: 140
    },
})