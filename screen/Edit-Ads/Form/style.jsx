import { StyleSheet } from 'react-native'

import { color } from '../../../constant/style'

const imageSize = { width: '47%', height: 200 }

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    },
    text: {
        color: 'gray',
        fontSize: 12,
    },
    imageBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '100%'
    },
    image: {
        width: imageSize.width,
        height: imageSize.height,
        marginVertical: 10,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: color.primary,
    },
    buttonBox: {
        width: imageSize.width,
        height: imageSize.height,
        borderWidth: 4,
        borderRadius: 4,
        borderStyle: 'dashed',
        borderColor: color.border,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: color.border,
        fontSize: 44,
        // fontWeight: 'bold',
    },
    submitBox: {
        width: '100%',
        backgroundColor: color.primary,
        position: 'absolute',
        bottom: 0,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitText: {
        color: 'white',
        fontSize: 18,
    }
})