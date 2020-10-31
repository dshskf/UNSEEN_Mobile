import React, { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { decode, encode } from 'base-64'
import * as atob from 'atob'

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';

import {
    View,
    Text,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import DropDown from '../../../components/Dropdown/dropdown.component'
import DatePicker from '../../../components/DatePicker/datepicker.component'
import { serialize } from 'object-to-formdata';

import { add_tours } from '../../../redux/tours/tours.action'
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
        image: [],
        imageData: [],
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
                alert('Sorry, we need file permissions to make this work!');
                return false
            }
            return true
        }
        return true
    };

    const _pickImage = async () => {
        try {
            let permission = await getPermissionAsync()
            if (permission) {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    // allowsEditing: true,
                    // aspect: [4, 3],
                    quality: 1,
                    base64: true
                });
                if (!result.cancelled) {
                    let filename = result.uri.split('/').pop()
                    let ext = filename.split('.')
                    ext = ext[ext.length - 1]
                    let contentType = `image/${ext}`;
                    console.log(contentType)

                    // const convert_to_blob = await b64toBlob(result.base64, contentType);
                    // // const convert_to_blob = `data:${contentType};base64,${encode(result.base64)}`;
                    // console.log(convert_to_blob);                          

                    const manipulator = await ImageManipulator.manipulateAsync(
                        result.uri,
                        [{ resize: { width: 400, height: 400 } }],
                        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
                    )

                    let data = {
                        uri: manipulator.uri,
                        type: contentType,
                        name: filename,
                    }

                    setInput({
                        ...input,
                        image: [...input.image, result.uri],
                        imageData: [input.imageData, result.base64]

                    });
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    // function b64toBlob(base64Data, contentType) {
    //     contentType = contentType || '';
    //     var sliceSize = 1024;
    //     var byteCharacters = atob(base64Data);
    //     var bytesLength = byteCharacters.length;
    //     var slicesCount = Math.ceil(bytesLength / sliceSize);
    //     var byteArrays = new Array(slicesCount);

    //     for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    //         var begin = sliceIndex * sliceSize;
    //         var end = Math.min(begin + sliceSize, bytesLength);

    //         var bytes = new Array(end - begin);
    //         for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
    //             bytes[i] = byteCharacters[offset].charCodeAt(0);
    //         }
    //         byteArrays[sliceIndex] = new Uint8Array(bytes);
    //     }
    //     return new Blob(byteArrays, { type: contentType });
    // }

    const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        console.log(blob);
        return blob;
    }


    // function b64toBlob(dataURI) {

    //     var byteString = atob(dataURI.split(',')[1]);
    //     var ab = new ArrayBuffer(byteString.length);
    //     var ia = new Uint8Array(ab);

    //     for (var i = 0; i < byteString.length; i++) {
    //         ia[i] = byteString.charCodeAt(i);
    //     }
    //     return new Blob([ab], { type: 'image/jpeg' });
    // }


    const submitForm = async () => {
        let postData = {
            title: input.title,
            cost: input.cost,
            destination: input.destination,
            start_date: input.start_date,
            end_date: input.end_date,
            image: input.imageData,
            description: input.description
        }

        // postData = serialize(postData)
        const postForm = await props.add_tours(postData)
        console.log(postForm)
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == "ios" ? "padding" : "target"}
            keyboardVerticalOffset={90}
        >
            <ScrollView style={{ ...styles.container, marginBottom: 70 }}>
                <View style={styles.container}>
                    {/* Title */}
                    <View style={styles.inputBox}>
                        <Text style={{ ...styles.text, marginTop: 10 }}>Title</Text>
                        <TextInput
                            style={styles.input}
                            value={input.title}
                            onChangeText={(val) => handleInput(val, "title")}
                            placeholder="Title"
                        />
                    </View>

                    {/* Cost */}
                    <View style={styles.inputBox}>
                        <Text style={styles.text}>Cost</Text>
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
                        <Text style={styles.text}>Country</Text>
                        <DropDown style={styles.input} handler={item => handleInput(item.value, "destination")} />
                    </View>

                    {/* Start Date */}
                    <View style={styles.inputBox}>
                        <Text style={styles.text}>Start Date</Text>
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
                        <Text style={styles.text}>End Date</Text>
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
                        <Text style={styles.text}>Image</Text>
                        <View style={styles.imageBox}>
                            {input.image && input.image.map((img, i) => <Image key={i} source={{ uri: img }} style={styles.image} />)}
                            <TouchableOpacity activeOpacity={0.4} style={styles.buttonBox} onPress={_pickImage}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Description */}
                    <View style={styles.inputBox}>
                        <Text style={styles.text}>Description</Text>
                        <TextInput
                            style={{ ...styles.input, height: 200, textAlignVertical: 'top', paddingTop: 10 }}
                            value={input.description}
                            onChangeText={(val) => handleInput(val, "description")}
                            placeholder="Description"
                            multiline
                        />
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity activeOpacity={0.8} style={styles.submitBox} onPress={submitForm}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = createStructuredSelector({

})

const mapDispatchToProps = (dispatch) => ({
    add_tours: (data) => dispatch(add_tours(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdsForm);

// export default AdsForm