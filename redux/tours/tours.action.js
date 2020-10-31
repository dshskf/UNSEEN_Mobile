import { Get, Post } from '../../constant/request'

const link = endpoint => {
    return `tours/${endpoint}`
}

export const get_tours_guides = (data) => async dispatch => {
    const get = await Get(link('guides'))

    return get.data
}

export const get_tours_agency = (data) => async dispatch => {
    const get = await Get(link('agency'))
    return get.data
}

export const get_tours_dashboard = (data) => async dispatch => {
    const get = await Get(link('dashboard'))
    return get.data
}

export const add_tours = (data) => async (dispatch) => {
    const post = await Post(link("dashboard/add"), data)
    return post.data
}

export const edit_tours = (data) => async dispatch => {
    const post = await Post(link("dashboard/edit"), data)
    return post.data
}

export const delete_tours = (data) => async dispatch => {
    const post = await Post(link('dashboard/delete'), data)
    return post.data
}