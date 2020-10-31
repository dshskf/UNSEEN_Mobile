import { authType } from './auth.action'

const INITIAL_STATES = {
    token: null,
    io: null
}

const authReducer = (state = INITIAL_STATES, action) => {   
    return state
}

export default authReducer