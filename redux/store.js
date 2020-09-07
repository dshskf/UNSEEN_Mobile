import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

import rootReducer from './root'

const middleware = [thunk]

export const store = createStore(rootReducer, applyMiddleware(...middleware))

export const persistor = persistStore(store)

