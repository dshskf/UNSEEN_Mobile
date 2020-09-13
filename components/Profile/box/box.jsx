import React from 'react';
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { styles } from './style'

const ProfileBox = props => {
    return (
        <View style={styles.container}>
            <View style={styles.boxItem}>
                <Icon style={styles.boxIcon} name="user-edit" />
                <Text style={styles.boxLabel}>Edit Profile</Text>
            </View>
            <View style={styles.boxItem}>
                <Icon style={styles.boxIcon} name="map-marked-alt" />
                <Text style={styles.boxLabel}>Track Location</Text>
            </View>
            <View style={{ ...styles.boxItem, borderRightWidth: 0 }}>
                <Icon style={styles.boxIcon} name="plane-departure" />
                <Text style={styles.boxLabel}>My Trip</Text>
            </View>
        </View>
    )
}

export default ProfileBox
