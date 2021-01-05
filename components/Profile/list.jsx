import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { default as FAIcon } from 'react-native-vector-icons/FontAwesome5'
import { default as AntIcon } from 'react-native-vector-icons/AntDesign'

import { color } from '../../constant/style'
import AsyncStorage from '@react-native-community/async-storage';

const ProfileList = props => {
    const opacity = .7
    const logout = async () => {
        await clearStorage()
        props.navigation.replace('Authentication')
    }

    const clearStorage = () => {
        return new Promise(resolve => {
            AsyncStorage.removeItem('user_token')
            AsyncStorage.removeItem('login_data')
            resolve()
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerBox}>
                <Text style={styles.headerTitle}>Menu</Text>
            </View>
            {/* <TouchableOpacity activeOpacity={opacity} style={styles.listBox}>
                <View style={styles.FAiconBox}>
                    <FAIcon name="address-card" style={styles.listFAIcon} />
                </View>
                <Text style={styles.listTitle}>Profile Ads</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={opacity}
                style={styles.listBox}
                onPress={() => props.navigation.navigate('EditAds')}
            >
                <View style={styles.FAiconBox}>
                    <FAIcon name="edit" style={styles.listFAIcon} />
                </View>
                <Text style={styles.listTitle}>Edit Ads</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={opacity} style={styles.listBox}>
                <View style={styles.FAiconBox}>
                    <FAIcon name="poll-h" style={styles.listFAIcon} />
                </View>
                <Text style={styles.listTitle}>Edit Article</Text>
            </TouchableOpacity> */}
            <TouchableOpacity activeOpacity={opacity} style={styles.listBox}>
                <View style={styles.FAiconBox}>
                    <FAIcon name="dollar-sign" style={styles.listFAIcon} />
                </View>
                <Text style={styles.listTitle}>Menunggu Pembayaran</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={opacity} style={styles.listBox} onPress={() => props.navigation.navigate('Requests')}>
                <View style={styles.FAiconBox}>
                    <FAIcon name="envelope" style={styles.listFAIcon} />
                </View>
                <Text style={styles.listTitle}>Trip Request</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={opacity} style={styles.listBox} onPress={logout}>
                <View style={styles.FAiconBox}>
                    <AntIcon name="logout" style={styles.listFAIcon} />
                </View>
                <Text style={styles.listTitle}>Logout</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity activeOpacity={opacity} style={styles.listBox}>
                <View style={styles.FAiconBox}>
                    <FAIcon name="times" style={styles.listFAIcon} />
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
    FAiconBox: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },
    listFAIcon: {
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