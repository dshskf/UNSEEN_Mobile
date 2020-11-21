import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native'
import io from 'socket.io-client'

import { pullSocket } from '../../../redux/features/features.selector'
import { chats_person_list } from '../../../redux/features/features.action'
import { API } from '../../../constant/link'
import { userStorage } from '../../../constant/request'

import { styles } from './style'

const Contact = props => {
    const [contact, setContact] = useState(null)
    const isFocused = useIsFocused()
    const tempContact = useRef()
    const socket = useRef()

    useEffect(() => {
        (async () => {
            let req = await props.chats_person_list()
            req = req.data.map((user, i) => {
                user.last_message = req.last_message[i].content
                return user
            })

            let storage = await userStorage()
            let io_conn = io(API)
            io_conn.emit('join_room', {
                room_id: `${storage.id}-${storage.type[0].toUpperCase()}`
            })

            io_conn.on('msg_response', async data => {
                pushMessage(data)
            })

            socket.current = io_conn
            tempContact.current = req
            setContact(req)
        })()

        return () => socket.current.disconnect()
    }, [isFocused])

    const pushMessage = (msg) => {
        const new_data = tempContact.current.map(contact => {
            if ((parseInt(contact.id) === parseInt(msg.sender_id) && contact.type === msg.sender_type) ||
                (parseInt(contact.id) === parseInt(msg.receiver_id) && contact.type === msg.receiver_type)) {
                contact.last_message = msg.content
                return contact
            }
            return contact
        })

        tempContact.current = new_data
        setContact(new_data)
    }

    const CardComponent = (data) => (
        <TouchableOpacity activeOpacity={0.7} onPress={() => props.navigation.navigate('Message', { senderId: data.item.id, senderType: data.item.type })} >
            <View style={styles.card}>
                <View style={styles.cardImage}>
                    <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ7ROTQk3ugONMyZPiGaexzfq-hdOxwcdQetQ&usqp=CAU" }} style={styles.image} />
                </View>
                <View style={styles.cardDetails}>
                    <Text style={styles.cardName}>{data.item.username}</Text>
                    <Text style={styles.cardMessage}>{data.item.last_message}</Text>
                </View>
                {/* <View style={styles.cardBadges}>
                    <View style={styles.badgesBox}>
                        <Text style={styles.badges}>0</Text>
                    </View>
                </View> */}
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            {
                contact && <FlatList
                    keyExtractor={item => item.id.toString()}
                    data={contact}
                    renderItem={CardComponent}
                    style={{ flex: 1 }}
                />
            }
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    socket: pullSocket
})

const mapDispatchToProps = (dispatch) => ({
    chats_person_list: (data) => dispatch(chats_person_list(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Contact);