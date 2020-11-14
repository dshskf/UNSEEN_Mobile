import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { color } from '../../constant/style'

const ProfileList = props => {
    const opacity = .7
    return (
        <View style={styles.container}>
            <View style={styles.headerBox}>
                <Text style={styles.headerTitle}>Menu</Text>
            </View>
            <TouchableOpacity activeOpacity={opacity} style={styles.listBox}>
                <View style={styles.iconBox}>
                    <Icon name="address-card" style={styles.listIcon} />
                </View>
                <Text style={styles.listTitle}>Profile Ads</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={opacity}
                style={styles.listBox}
                onPress={() => props.navigation.navigate('EditAds')}
            >
                <View style={styles.iconBox}>
                    <Icon name="edit" style={styles.listIcon} />
                </View>
                <Text style={styles.listTitle}>Edit Ads</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={opacity} style={styles.listBox}>
                <View style={styles.iconBox}>
                    <Icon name="poll-h" style={styles.listIcon} />
                </View>
                <Text style={styles.listTitle}>Edit Article</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={opacity} style={styles.listBox}>
                <View style={styles.iconBox}>
                    <Icon name="dollar-sign" style={styles.listIcon} />
                </View>
                <Text style={styles.listTitle}>Menunggu Pembayaran</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={opacity} style={styles.listBox}>
                <View style={styles.iconBox}>
                    <Icon name="envelope" style={styles.listIcon} />
                </View>
                <Text style={styles.listTitle}>Trip Request</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity activeOpacity={opacity} style={styles.listBox}>
                <View style={styles.iconBox}>
                    <Icon name="times" style={styles.listIcon} />
                </View>
                <Text style={styles.listTitle}>Trip Dibatalkan</Text>
            </TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '95%',
        backgroundColor: 'white',
        marginVertical: '5%'
    },
    headerBox: {
        borderBottomWidth: 3,
        paddingBottom: 10,
        borderBottomColor: color.primary
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: color.primary,
    },
    listBox: {
        height: '15%',
        borderBottomWidth: 1,
        borderColor: color.border,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '5%'
    },
    iconBox: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },
    listIcon: {
        color: 'rgba(0,0,0,0.8)',
        fontSize: 18,

        textAlign: 'center'
    },
    listTitle: {
        marginLeft: '5%',
        color: 'rgba(0,0,0,0.5)'
    }
})

export default ProfileList