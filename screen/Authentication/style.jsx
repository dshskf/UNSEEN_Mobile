import { StyleSheet } from 'react-native'
import { color } from '../../constant/style'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    display: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        width: '80%',
        height: 400
    },
    formInput: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: color.border,
        height: 45,
        paddingLeft: 15,
        marginVertical: 10,
    },
    formText: {
        width: '100%',
        alignItems: 'flex-end'
    },
    forgotPasswordText: {
        color: '#4faed9'
    },
    button: {        
        backgroundColor: color.primary
    },
    bottomNavigate: {
        height: '6%',
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        borderTopWidth: 1,
        borderTopColor: color.border,
        backgroundColor: 'white'
    },
    bottomLinkNavigate: {
        color: color.primary,
        marginLeft: 2
    }

})