import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { styles } from './style'

const ProfileBox = props => {
    return (
        <View style={styles.container}>
            <View style={styles.boxItem}>
                <Icon style={styles.boxIcon} name="user-edit" />
                <Text style={styles.boxLabel}>Edit Profile</Text>
            </View>
            <TouchableOpacity
                style={styles.boxItem}                
                activeOpacity={0.7}
            >
                <Icon style={styles.boxIcon} name="map-marked-alt" />
                <Text style={styles.boxLabel}>Track Location</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ ...styles.boxItem, borderRightWidth: 0 }}
                onPress={() => props.navigation.navigate('Bookings')}
                activeOpacity={0.7}
            >
                <Icon style={styles.boxIcon} name="plane-departure" />
                <Text style={styles.boxLabel}>My Tours</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProfileBox
