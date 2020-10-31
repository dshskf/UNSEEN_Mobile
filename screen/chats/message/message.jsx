import React from 'react';
import { View, Text, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import { styles } from './style'
import { color } from '../../../constant/style'
import Icon from 'react-native-vector-icons/Ionicons'

const Message = props => {
    const userMsg = {
        messageBox: {
            alignSelf: 'flex-end',
            backgroundColor: color.primary
        },
        message: {
            color: 'white'
        }
    }
    const MsgComponent = data => (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={{
                    ...styles.messageBox,
                    ...data.item.user && userMsg.messageBox,
                }}>
                    {
                        data.item.notifications && <View style={styles.adsBox}>
                            <View style={styles.adsImage}>
                                <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ7ROTQk3ugONMyZPiGaexzfq-hdOxwcdQetQ&usqp=CAU" }} style={styles.image} />
                            </View>
                            <View style={styles.adsDetails}>
                                <Text style={styles.adsTitle}>Holiday for 1 year pac...</Text>
                                
                                <Text style={styles.adsDestination}>3 Destinations</Text>
                            </View>
                        </View>
                    }
                    <Text style={{
                        ...styles.message,
                        ...data.item.user && userMsg.message,
                    }}>{data.item.msg}</Text>
                    <Text style={styles.messageDate}>09:00 am</Text>
                </View>
            </View>
        </View>
    )

    const data = [{ id: 1, msg: 'aaffffffffffffff', user: true, notifications: true }, { id: 2, msg: 'xwwwwwwwwwwwwwx', user: true, notifications: false }, { id: 3, msg: 'brtttttttttttteb', user: false, notifications: true },]
    return (
        <View style={styles.container}>
            <View style={styles.preventer} />
            <View style={styles.contactBox}>
                <TouchableOpacity style={styles.contactExit} onPress={() => props.navigation.navigate('List')}>
                    <Icon name="md-arrow-back" style={styles.exitIcon} />
                </TouchableOpacity>
                <View style={styles.contactImage}>
                    <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ7ROTQk3ugONMyZPiGaexzfq-hdOxwcdQetQ&usqp=CAU" }} style={styles.image} />
                </View>
                <View style={styles.contactDetails}>
                    <Text style={styles.nameText}>Elon Musk</Text>
                    <Text style={styles.statusText}>Online</Text>
                </View>
            </View>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={data}
                renderItem={MsgComponent}
                style={{ flex: 1 }}
            />
            <View style={styles.inputBox}>
                <TextInput
                    multiline={true}
                    placeholder="Enter a message..."
                    underlineColorAndroid='transparent'
                    style={styles.input} />
                <View style={styles.sendBox}>
                    <Icon name="md-send" style={styles.sendButton} />
                </View>
            </View>
        </View>
    )
}

export default Message