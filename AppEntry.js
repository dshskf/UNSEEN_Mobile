import registerRootComponent from 'expo/build/launch/registerRootComponent';
import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../../redux/store'
import App from '../../App';

const Component = () => (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
)

registerRootComponent(Component);
