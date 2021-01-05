import React, { useState, useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';


import { sign_in } from '../../redux/auth/auth.action'
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

const LoginScreen = props => {
    const [inputData, setInputData] = useState({
        username: '',
        password: ''
    })

    useEffect(() => {
        if (props.route.params) {
            setInputData({ ...inputData, username: props.route.params.email })
        }
    }, [props.route.params])

    const handleInput = (input, name) => {
        name = name.toLowerCase()
        setInputData({ ...inputData, [name]: input })
    }

    const confirmAction = async () => {
        const { username, password } = inputData

        const post = await props.sign_in({
            username: username,
            password: password,
            type: 'users'
        })
        if (!post.err) {
            props.navigation.replace('Home')
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <View style={styles.display}>
                    <LogoComponent {...props} />
                    <View style={styles.form}>
                        <TextInput
                            style={styles.formInput}
                            placeholder="Username"
                            value={inputData.username}
                            onChangeText={(input) => handleInput(input, 'username')}
                        />
                        <TextInput
                            style={styles.formInput}
                            placeholder="Password"
                            value={inputData.password}
                            secureTextEntry={true}
                            onChangeText={(input) => handleInput(input, 'password')}
                        />
                        <View style={styles.formText}>
                            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                        </View>
                        <CustomButton content="Login" handler={confirmAction} />
                    </View>
                    <View style={styles.bottomNavigate}>
                        <Text>Don't have an account?</Text>
                        <Text
                            onPress={() => props.navigation.navigate('Register')}
                            style={styles.bottomLinkNavigate}
                        >Register</Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}
const mapStateToProps = createStructuredSelector({

})

const mapDispatchToProps = (dispatch) => ({
    sign_in: (data) => dispatch(sign_in(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);