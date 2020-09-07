import { API } from '../../constant/link'
import axios from 'axios'

export const authType = {
    setToken: "SET_TOKEN",
    setSocket: "SET_SOCKET",
}


const URL = API + "user"

const Get = async (link, header = null) => {
    if (header) {
        return await axios.get(`${URL}/${link}`, header)
    }
    return await axios.get(`${URL}/${link}`)
}

const Post = async (link, data, header = null) => {
    if (header) {
        return await axios.post(`${URL}/${link}`, data, header)
    }
    return await axios.post(`${URL}/${link}`, data)
}

export const sign_up = (data) => async (dispatch) => {
    const post = await Post('register', data)
    return post.data
}

export const sign_in = (data) => async (dispatch) => {
    const post = await Post('login', data)
    return post.data
}
