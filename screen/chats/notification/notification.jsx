import React from 'react';
import { View, Text, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';

import { styles } from './style'

const Notification = props => {
    const notificationComponent = data => (
        <TouchableOpacity activeOpacity={0.5} style={styles.container}>
            <View style={styles.box}>
                <View style={styles.imageBox}>
                    <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ7ROTQk3ugONMyZPiGaexzfq-hdOxwcdQetQ&usqp=CAU" }} style={styles.image} />
                </View>
                <View style={styles.detailsBox}>
                    <View style={styles.detailsMessage}>
                        <Text style={styles.message}>Horay you got a new bookings!</Text>
                    </View>
                    <View style={styles.detailsAds}>
                        <Text style={styles.adsTitle}>Holiday for 3 seasons in europe</Text>
                        <Text style={styles.adsDestination}>10 Destination</Text>
                    </View>
                </View>
                <View style={styles.dateBox}>
                    <Text style={styles.dateText}>19:00 am </Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    const data = [{ id: 1, val: 1 }, { id: 2, val: 2 }]

    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={data}
                renderItem={notificationComponent}
                style={{ flex: 1 }}
            />
        </View>
    )
}

export default Notification