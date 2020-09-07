import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Authentication from './screen/Authentication'
import Test from './test'

export default function App() {
  const Stack = createStackNavigator()

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Authentication" component={Authentication} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
