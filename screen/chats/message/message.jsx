import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TextInput, Image, TouchableOpacity, Keyboard } from 'react-native';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import io from 'socket.io-client'

import { chats_fetch_message, chats_send_message } from '../../../redux/features/features.action'
import { pullSocket } from '../../../redux/features/features.selector'
import { userStorage, API } from '../../../constant/request'

import { styles } from './style'
import { color } from '../../../constant/style'
import Icon from 'react-native-vector-icons/Ionicons'


const Message = props => {
    const [input, setInput] = useState('')
    const [message, setMessage] = useState(null)
    const [userData, setUserData] = useState(null)
    const { senderId, senderType } = props.route.params
    const tempMessage = useRef()
    const flatlist = useRef()
    const socket = useRef()

    useEffect(() => {
        (async () => {
            let storage = await userStorage()
            const tours_type = storage.typeCode === 'U' ? receiver_type : storage.typeCode
            let req = await props.chats_fetch_message({
                receiver_id: senderId,
                receiver_type: senderType,
                tours_type: tours_type
            })
            req = req.data.map((msg, i) => {
                // Check if its user
                if (parseInt(msg.sender_id) === parseInt(senderId) && msg.sender_type === senderType) msg.isUser = false
                else msg.isUser = true

                // Check last message for margin
                if (req.data.length - 1 === i) msg.isLast = true
                msg.createdAt = formatTime(msg.createdAt)

                return msg
            })

            tempMessage.current = req
            let io_conn = io(API)
            io_conn.emit('join_room', {
                room_id: `${storage.id}-${storage.type[0].toUpperCase()}`
            })

            io_conn.on('msg_response', async data => {
                pushMessage(tempMessage.current, data, false)
            })

            socket.current = io_conn
            setUserData(storage)
            setMessage(req)
        })()

        return () => { socket.current.disconnect() }
    }, [])


    const userMsg = {
        messageBox: {
            alignSelf: 'flex-end',
            backgroundColor: color.primary
        },
        message: {
            color: 'white'
        }
    }

    const formatTime = (time) => {
        const date = new Date(time)
        return `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
    }

    const handlerInput = val => {
        setInput(val.nativeEvent.text)
    }

    const pushMessage = (msgData = null, msg, isUser) => {
        const date = formatTime(Date.now())
        const msgArr = msgData ? msgData : message
        const new_data = [...msgArr, { ...msg, id: Math.random() * 100000 * Math.random(), isUser: isUser, createdAt: date, }]

        tempMessage.current = new_data
        setMessage(new_data)

        if (flatlist.current) {
            flatlist.current.scrollToEnd({ animated: true })
        }

    }

    const send_message = async () => {
        const msgData = {
            sender_id: userData.id,
            sender_type: userData.type[0].toUpperCase(),
            receiver_id: senderId,
            receiver_type: senderType,
            content: input,
        }
        const req = await props.chats_send_message(msgData)

        if (!req.err) {
            socket.current.emit('msg', msgData)
            pushMessage(null, msgData, true)
            setInput('')
            Keyboard.dismiss()
        }
    }

    const MsgComponent = data => {
        let image = data.item.tours_id ? API + data.item.tours_image[0].replace('\\', '/') : null
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <View style={{
                        ...styles.messageBox,
                        ...data.item.isUser && userMsg.messageBox,
                        // marginBottom: data.item.isLast && 80
                    }}>
                        {
                            data.item.tours_id && <View style={styles.adsBox}>
                                <View style={styles.adsImage}>
                                    <Image source={{ uri: image }} style={styles.image} />
                                </View>
                                <View style={styles.adsDetails}>
                                    <Text style={styles.adsTitle}>{data.item.tours_title}</Text>

                                    <Text style={styles.adsDestination}>${data.item.tours_cost}</Text>
                                </View>
                            </View>
                        }
                        <Text style={{
                            ...styles.message,
                            ...data.item.isUser && userMsg.message,
                        }}>{data.item.content}</Text>
                        <Text style={styles.messageDate}>{data.item.createdAt}</Text>
                    </View>
                </View>
            </View>
        )
    }

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
            {
                message && <View style={styles.flatlistBox}>
                    <FlatList
                        keyExtractor={item => item.id.toString()}
                        data={message}
                        ref={flatlist}
                        onContentSizeChange={() => flatlist.current.scrollToEnd({ animated: true })}
                        renderItem={MsgComponent}
                        style={{ flex: 1 }}
                    />
                </View>
            }
            {
                message && <View style={styles.inputBox}>
                    <TextInput
                        multiline={true}
                        placeholder="Enter a message..."
                        underlineColorAndroid='transparent'
                        value={input}
                        onChange={handlerInput}
                        style={styles.input} />
                    <TouchableOpacity activeOpacity={0.8} onPress={send_message} style={styles.sendBox}>
                        <Icon name="md-send" style={styles.sendButton} />
                    </TouchableOpacity>
                </View>
            }

        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    socket: pullSocket
})

const mapDispatchToProps = (dispatch) => ({
    chats_fetch_message: (data) => dispatch(chats_fetch_message(data)),
    chats_send_message: (data) => dispatch(chats_send_message(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Message);