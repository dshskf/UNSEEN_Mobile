import React from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { styles } from './style'

const Contact = props => {
    const CardComponent = (data) => (
        <TouchableOpacity activeOpacity={0.7} onPress={() => props.navigation.navigate('Message', { personId: '10' })} >
            <View style={styles.card}>
                <View style={styles.cardImage}>
                    <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ7ROTQk3ugONMyZPiGaexzfq-hdOxwcdQetQ&usqp=CAU" }} style={styles.image} />
                </View>
                <View style={styles.cardDetails}>
                    <Text style={styles.cardName}>Elon Musk</Text>
                    <Text style={styles.cardMessage}>Hei i got {data.item.val} some new cool project...</Text>
                </View>
                <View style={styles.cardBadges}>
                    <View style={styles.badgesBox}>
                        <Text style={styles.badges}>0</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
    const data = [{ id: 1, val: 1 }, { id: 2, val: 2 }, { id: 3, val: 3 },]

    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={data}
                renderItem={CardComponent}
                style={{ flex: 1 }}
            />
        </View>
    )
}

export default Contact