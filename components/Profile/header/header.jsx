import React from 'react'
import { View, Text, SafeAreaView, Image, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

import { styles } from './style'

const ProfileHeader = props => {
    return (
        <SafeAreaView style={styles.header}>
            <ImageBackground style={styles.ImageBackground} source={require('../../../assets/img/forest.jpg')}>
                <View style={styles.headerContent}>
                    <View style={styles.imageBox}>
                        <Image style={styles.image} source={require('../../../assets/img/forest.jpg')} />
                    </View>
                    <View style={styles.nameBox}>
                        <Text style={styles.nameTitle}>Elon Musk</Text>
                        <Text style={styles.nameAction}>elon@gmail.com</Text>
                    </View>
                    <View style={styles.actionBox}>
                        <View style={styles.iconBox}>
                            <Icon style={styles.actionIcon} name="message1" />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView >

    )
}

export default ProfileHeader