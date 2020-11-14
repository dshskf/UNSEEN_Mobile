import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

export const API = "http://192.168.1.15:1234/"

export const tokenStorage = async () => {
    const tokens = await AsyncStorage.getItem('user_token')
    return tokens
}

export const userStorage = async () => {
    const user = await AsyncStorage.getItem('login_data')    
    return user ? JSON.parse(user) : user
}

export const Get = async (route) => {
    const URL = API + route
    const tokens = await tokenStorage()
    if (tokens) {
        const header = {
            headers: {
                "Authorization": `Bearer ${tokens}`
            }
        }
        return await axios.get(URL, header)
    }
    return await axios.get(URL)
}

export const Post = async (route, data) => {
    const URL = API + route
    const tokens = await tokenStorage()
    if (tokens) {
        const header = {
            headers: {
                "Authorization": `Bearer ${tokens}`
            }
        }

        return await axios.post(URL, data, header)
    }

    return await axios.post(URL, data)
}