import { API } from '../../constant/link'
import axios from 'axios'

export const productsType = {

}


const URL = API + "product"

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


export const add_product = (data) => async (dispatch) => {
    const post = await Post("add", data.form, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
    return post.data
}

export const edit_product = (data) => async dispatch => {
    const post = await Post("edit", data.form, {
        headers: {
            "Authorization": `Bearer ${data.token}`
        }
    })
    return post.data
}

export const get_product = (data) => async dispatch => {
    const get = await Get('fetch')
    return get.data
}