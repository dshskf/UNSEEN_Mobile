import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';

import authReducer from './auth/auth.reducer'
import featuresReducer from './features/features.reducer'

const persistConfig = {
    key: 'toor',
    storage: AsyncStorage,
    whitelist: ['auth']
}

const rootReducer = combineReducers({
    auth: authReducer,
    features: featuresReducer,
})

export default persistReducer(persistConfig, rootReducer)