import { API } from "./link"
import { userStorage } from "./request"

export const validateLogin = async () => {
    const storage = await userStorage()
    return storage ? storage : null
}

export const formatImage = (path) => {
    if (path) {
        return API + path.replace('\\', '/')
    }
    return path

}
