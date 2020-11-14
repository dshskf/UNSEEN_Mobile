import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import { decode, encode } from 'base-64'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './screen/home'
import Authentication from './screen/Authentication'
import EditAdsScreen from './screen/Edit-Ads'
import { tokenStorage } from './constant/request'

export default function App() {
  const Stack = createStackNavigator()
  const [token, setToken] = useState(null)

  useEffect(() => {
    if (!global.btoa) { global.btoa = encode }
    if (!global.atob) { global.atob = decode }
    fetchToken()
  }, [])

  fetchToken = async () => {
    const tokens = await tokenStorage()
    setToken(tokens)
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Authentication" component={Authentication} options={{ headerShown: false }} />
            <Stack.Screen name="EditAds" component={EditAdsScreen} options={{ headerShown: false, animationEnabled: false, }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
