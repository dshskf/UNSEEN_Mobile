import { API } from "./link"
import { userStorage } from "./request"

export const validateLogin = async () => {
    const storage = await userStorage()
    return storage ? storage : null
}

export const formatImage = (path) => {
    return API + path.replace('\\', '/')
}