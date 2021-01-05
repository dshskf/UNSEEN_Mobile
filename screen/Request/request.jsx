import React, { useEffect, useState, useRef } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { default as RequestCard } from '../../components/Card/Request/card'
import { useIsFocused } from '@react-navigation/native'

import { get_request, update_request } from '../../redux/management/management.action'
import io, { Socket } from 'socket.io-client'

import {
    View,
    FlatList,
    RefreshControl,
    Alert,
    Text,
    TextInput
} from 'react-native'

import { styles } from './style'
import { API } from '../../constant/link';
import { userStorage } from '../../constant/request';
import { chats_send_message } from '../../redux/features/features.action';
import { send_comment_requests } from '../../redux/tours/tours.action'
import Modal from '../../components/Modal/modal';
import { Rating } from 'react-native-ratings';

const RequestScreen = props => {
    const [request, setRequest] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [reviewForm, setReviewForm] = useState({
        rating: 0,
        description: '',
        request_id: null,
        guides_id: null
    })

    const isFocused = useIsFocused()
    const isFetch = useRef(false)
    const socketIo = useRef(null)
    const tempRequest = useRef(null)

    useEffect(() => {
        (async () => {
            const storage = await userStorage()
            const socket = io(API)

            socket.emit('join_room', {
                room_id: `${storage.id}-${storage.typeCode}`
            })

            socket.on('new_request', res => {
                tempRequest.current = tempRequest.current.map(r => {
                    if (res.request_id === r.id) {
                        if (r.is_approve === false) {
                            alert(r.guides_name + " has approved your tours!")
                            r.is_approve = true
                        } else if (r.is_active === false) {
                            alert(r.guides_name + " has activate your tours!")
                            r.is_active = true
                        }
                        return r
                    }
                    return r
                })
                setRequest(tempRequest.current)
            })

            socketIo.current = socket
        })()
        fetch()

        return () => {
            setPage(1)
            return socketIo.current.disconnect()
        }
    }, [isFocused])


    useEffect(() => {
        isFetch.current = false
        fetch()
    }, [page])

    const fetch = async () => {
        const storage = await userStorage()
        const getrequest = await props.get_request({
            page: page,
            is_mobile: true,
            type: storage.typeCode
        })
        tempRequest.current = getrequest.data
        setTotalPage(getrequest.total_page)
        setRequest(getrequest.data)
    }

    const refreshHandler = async () => {
        setRefresh(true)
        await fetch()
        setRefresh(false)
    }

    const handleListPagination = () => {
        if (totalPage && page < totalPage) {
            isFetch.current = true
            setPage(page + 1)
        }
    }

    const loadPaginationSpinner = () => {
        return isFetch.current ? (<Spinner extStyle={styles.footerLoad} />) : null
    }

    const handleConfirm = (item) => {        
        if (new Date(item.end_date) < Date.now() && item.is_active) {
            setOpenModal(true)
            setReviewForm({
                rating: 0,
                description: '',
                request_id: item.id,
                guides_id: item.guides_id
            })
        } else if (item.is_approve && !item.is_payed && !item.is_active) {
            Alert.alert(
                null,
                "Already pay this tour?",
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: "Delete", onPress: () => deleteAction(item.id) },
                    { text: "Yes", onPress: () => confirmAction(item.id, item.index) }
                ],
                { cancelable: false }
            );
        } else if (item.is_payed && item.is_active) {
            // const filter = request.filter(b => b.id === id)            
            props.navigation.navigate('Tracking', {
                id: item.id,
                type: 'requests'
            })
        } else if (!item.is_approve) {
            alert("Waiting for Approval!")
        } else if (item.is_payed) {
            alert("Waiting for Activation!")
        }
        return
    }

    const confirmAction = async (request_id, index) => {
        let selected_request = request[index]
        selected_request.is_payed = true

        const dataToSubmit = {
            request_id: request_id,
            action: 'update'
        }

        const post = await props.update_request({ ...dataToSubmit })

        if (!post.err) {
            const msgData = {
                receiver_id: selected_request.guides_id,
                receiver_type: 'G',
                content: `${selected_request.user_username} has been paid the requests!`,
            }
            await props.chats_send_message({ ...msgData })

            socketIo.current.emit('update_request', {
                opposite_room: `${selected_request.guides_id}-G`,
                request_id: selected_request.id
            })

            const new_request = request.map(r => r)
            new_request[index] = selected_request

            tempRequest.current = new_request
            setRequest(new_request)
            alert("Success!")
        } else {
            alert(post.err)
        }
    }

    const deleteAction = async (request_id) => {
        let selected_request = request.filter(b => b.id === request_id)
        selected_request = selected_request[0]

        const dataToSubmit = {
            request_id: request_id,
            tours_id: selected_request.tours_id,
            action: 'delete'
        }

        const post = await props.update_request_user({ form: dataToSubmit, })


        if (!post.err) {
            const new_request = request.filter(b => b.id !== request_id)
            setRequest(new_request)
        }
    }

    const handleRatingInput = (rating) => {
        setReviewForm({
            ...reviewForm,
            rating: rating,
        })
    }

    const handleTextInput = (value) => {
        setReviewForm({
            ...reviewForm,
            description: value,
        })
    }

    const sendReview = async () => {
        const storage = await userStorage()
        if (reviewForm.description === '' || reviewForm.rating === 0) {
            return alert('Please Fill the empty Field!')
        }

        const post = await props.send_comment_requests({
            sender_id: storage.id,
            request_id: reviewForm.request_id,
            guides_id: reviewForm.guides_id,
            rating: reviewForm.rating,
            description: reviewForm.description
        })

        if (!post.err) {
            const updateRequest = request.filter(r => r.id !== reviewForm.request_id)
            alert('Success!')
            setRequest(updateRequest)
            setOpenModal(false)
        } else {
            alert(post.err)
        }
    }

    const cardScreen = ({ item, index }) => !item.is_reviewed && <RequestCard action={handleConfirm} index={index} {...item} />

    const reviewFormComponent = () => (
        <View>
            <View style={styles.formItem}>
                <Rating
                    type='custom'
                    ratingCount={5}
                    imageSize={30}
                    startingValue={reviewForm.rating}
                    // style={styles.ratingStar}
                    onFinishRating={handleRatingInput}
                />
            </View>
            <View style={styles.formItem}>
                <Text style={styles.formTitle}>Description</Text>
                <TextInput
                    style={{ ...styles.textInput, textAlignVertical: 'top' }}
                    underlineColorAndroid="transparent"
                    placeholder="Type something here..."
                    multiline={true}
                    numberOfLines={4}
                    maxLength={500}
                    value={reviewForm.description}
                    onChangeText={handleTextInput}
                />
            </View>
        </View>
    )

    return (
        <View style={styles.container}>
            {
                openModal && <Modal
                    modalHeader={"Give Reviews!"}
                    formComponent={reviewFormComponent}
                    buttonLabel={'Submit'}
                    disabled={false}
                    onClose={() => setOpenModal(false)}
                    onConfirm={sendReview}
                />
            }

            <FlatList
                keyExtractor={item => item.id.toString()}
                data={request}
                renderItem={cardScreen}
                style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={refreshHandler}
                    />
                }
                onEndReached={handleListPagination}
                onEndReachedThreshold={0.1}
                ListFooterComponent={loadPaginationSpinner}
            />
        </View>
    )

}

const mapStateToProps = createStructuredSelector({

})

const mapDispatchToProps = (dispatch) => ({
    get_request: (data) => dispatch(get_request(data)),
    chats_send_message: (data) => dispatch(chats_send_message(data)),
    update_request: (data) => dispatch(update_request(data)),
    send_comment_requests: (data) => dispatch(send_comment_requests(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(RequestScreen);