import React, { useEffect, useState } from 'react'
import { default as User } from './user/profile'

import { useIsFocused } from '@react-navigation/native'
import { validateLogin } from '../../constant/middleware'

import Spinner from '../../components/Spinner/spinner'


const Profile = props => {
    const [isLogin, setIsLogin] = useState(false)
    const isFocused = useIsFocused()

    useEffect(() => {
        (async () => {
            const isLogin = await validateLogin()            
            
            if (isLogin) {
                setIsLogin(true)
            } else {
                props.navigation.navigate("Authentication")
            }
        })()
    }, [isFocused])

    return isLogin ? (<User {...props} />) : (<Spinner />)


}

export default Profile