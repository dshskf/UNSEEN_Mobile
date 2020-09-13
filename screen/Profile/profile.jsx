import React from 'react'
import { View, Text } from 'react-native'

import ProfileHeader from '../../components/Profile/header/header'
import ProfileBox from '../../components/Profile/box/box'
import ProfileList from '../../components/Profile/list'

import { styles } from './style'

const ProfileMainScreen = props => {
    return (
        <View style={styles.container}>
            <ProfileHeader />
            <ProfileBox />
            <ProfileList {...props} />
        </View>
    )
}


export default ProfileMainScreen