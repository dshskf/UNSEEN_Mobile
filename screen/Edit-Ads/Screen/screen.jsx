import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import {
    View,
    Text,
    Image,
    Button,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';

import DropDown from '../../../components/Dropdown/dropdown.component'
import DatePicker from '../../../components/DatePicker/datepicker.component'

import { add_product } from '../../../redux/products/products.action'
import { styles } from './style'


const AdsForm = props => {
    const [input, setInput] = useState({
        title: '',
        cost: '',
        destination: '',
        start_date: '',
        isStartDateOpen: false,
        end_date: '',
        isEndDateOpen: false,
        image: null,
        description: '',
    })

    useEffect(() => {
        // getPermissionAsync()
    }, [])

    const handleInput = (value, name) => {
        setInput({ ...input, [name]: value })
    }

    const handleOpenDate = (name) => {
        setInput({ ...input, [name]: true })
    }

    const handleDate = (e, value, name, boolName) => {
        if (value) {
            setInput({ ...input, [name]: value.toString(), [boolName]: Platform.OS === 'ios' })
        }
    }

    const getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    const _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                // allowsEditing: true,
                // aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                console.log(result)
                setInput({ ...input, image: result.uri });
            }

            // console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    const submitForm = async () => {
        const postForm = await props.postProduct({
            title: input.title,
            cost: input.cost,
            destination: input.destination,
            start_date: input.start_date,
            end_date: input.end_date,
            image: [input.image],
            description: input.description
        })
        console.log(postForm)
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == "ios" ? "padding" : "target"}
            keyboardVerticalOffset={90}
        >
            <ScrollView style={styles.container}>
                <View style={styles.container}>
                    {/* Title */}
                    <View style={styles.inputBox}>
                        <TextInput
                            style={{ ...styles.input, marginTop: 50 }}
                            value={input.title}
                            onChangeText={(val) => handleInput(val, "title")}
                            placeholder="Title"
                        />
                    </View>

                    {/* Cost */}
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            value={input.cost}
                            keyboardType="number-pad"
                            onChangeText={(val) => handleInput(val, "cost")}
                            placeholder="Cost"
                        />
                    </View>

                    {/* Destination */}
                    <View style={styles.inputBox}>
                        <DropDown style={styles.input} handler={item => handleInput(item.value, "destination")} />
                    </View>

                    {/* Start Date */}
                    <View style={styles.inputBox}>
                        <Text
                            title="Start Date"
                            style={styles.input}
                            onPress={() => handleOpenDate('isStartDateOpen')}
                        >{input.start_date ? input.start_date : 'Start Date'}</Text>
                        <DatePicker
                            style={styles.input}
                            show={input.isStartDateOpen}
                            handler={(e, date) => handleDate(e, date, "start_date", 'isStartDateOpen')}
                            value={input.start_date}
                            placeholder="Start Date"
                        />
                    </View>

                    {/* End Date */}
                    <View style={styles.inputBox}>
                        <Text
                            title="End Date"
                            style={styles.input}
                            onPress={() => handleOpenDate('isEndDateOpen')}
                        >{input.end_date ? input.end_date : 'End Date'}</Text>
                        <DatePicker
                            style={styles.input}
                            show={input.isEndDateOpen}
                            handler={(e, date) => handleDate(e, date, "end_date", 'isEndDateOpen')}
                            value={input.end_date}
                        />
                    </View>

                    {/* Image */}
                    <View style={styles.inputBox}>
                        {/* <Text
                            title="End Date"
                            style={styles.input}
                            onPress={_pickImage}
                        >{input.end_date ? input.end_date : 'End Date'}</Text> */}
                        <Button title="Pick an image from camera roll" onPress={_pickImage} />
                        {input.image && <Image source={{ uri: input.image }} style={{ width: 200, height: 200 }} />}
                    </View>

                    {/* Description */}
                    <View style={styles.inputBox}>
                        <TextInput
                            style={{ ...styles.input, height: 200, textAlignVertical: 'top', paddingTop: 10 }}
                            value={input.description}
                            onChangeText={(val) => handleInput(val, "description")}
                            placeholder="Description"
                            multiline
                        />
                    </View>
                    <Button title="Submit" onPress={submitForm} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = createStructuredSelector({

})

const mapDispatchToProps = (dispatch) => ({
    postProduct: (data) => dispatch(add_product(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdsForm);

// export default AdsForm