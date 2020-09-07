import { authType } from './auth.action'

const INITIAL_STATES = {
    token: null,
    io: null
}

const authReducer = (state = INITIAL_STATES, action) => {
    if (action.type === authType.setToken) {
        return {
            ...state,
            token: action.data
        }

    }
    if (action.type === authType.setSocket) {
        return {
            ...state,
            io: action.data
        }

    }
    return state
}

export default authReducer