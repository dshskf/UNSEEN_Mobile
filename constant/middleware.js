import { userStorage } from "./request"

export const validateLogin = async () => {
    const storage = await userStorage()    
    return storage ? storage : null
}