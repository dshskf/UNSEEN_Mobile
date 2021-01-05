import { API } from "./link"
import { userStorage } from "./request"

export const validateLogin = async () => {
    const storage = await userStorage()
    return storage ? storage : null
}

export const formatImage = (path) => {
    if (!path) {
        return require('../assets/img/no_image.png')
    }
    else if (path.includes('http')) {
        return ({ uri: path })
    }
    else if (path) {
        return { uri: API + path.replace('\\', '/') }
    }
}
