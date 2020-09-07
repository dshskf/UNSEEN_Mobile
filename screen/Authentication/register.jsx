import React, { useState } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';

import { pullToken } from '../../redux/auth/auth.selector'
import { sign_up } from '../../redux/auth/auth.action'

import {
    View,
    TextInput,
    Text,
    Platform,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback
} from 'react-native'

import CustomButton from '../../components/Button/button'
import LogoComponent from '../../components/Logo/logo'

import { styles } from './style'

const RegisterScreen = props => {
    const [inputData, setInputData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleInput = (input, name) => {
        name = name.toLowerCase()
        setInputData({ ...inputData, [name]: input })
    }

    const confirmAction = async () => {
        const { username, email, password } = inputData

        const post = await props.postFormRegisters({
            username: username,
            email: email,
            password: password
        })        

        if (!post.err) {            
            props.navigation.navigate('Login', {
                email: email
            })
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <View style={styles.display}>
                    <LogoComponent />
                    <View style={styles.form}>
                        <TextInput
                            style={styles.formInput}
                            placeholder="Username"
                            value={inputData.username}
                            onChangeText={(input) => handleInput(input, 'username')}
                        />
                        <TextInput
                            style={styles.formInput}
                            placeholder="Email"
                            value={inputData.email}
                            onChangeText={(input) => handleInput(input, 'email')}
                        />
                        < TextInput
                            style={styles.formInput}
                            placeholder="Password"
                            value={inputData.password}
                            secureTextEntry={true}
                            onChangeText={(input) => handleInput(input, 'password')}
                        />
                        <CustomButton content="Register" handler={confirmAction} />
                    </View>
                    <View style={styles.bottomNavigate}>
                        <Text>Already have an account?</Text>
                        <Text
                            onPress={() => props.navigation.navigate('Login')}
                            style={styles.bottomLinkNavigate}
                        >Login</Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const mapStateToProps = createStructuredSelector({
    token: pullToken
})

const mapDispatchToProps = (dispatch) => ({
    postFormRegisters: (data) => dispatch(sign_up(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);