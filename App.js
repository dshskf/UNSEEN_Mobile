import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { default as Home } from './screen/home'
import { default as Authentication } from './screen/Authentication'
import { default as EditAdsScreen } from './screen/Edit-Ads'
import { default as BookingScreen } from './screen/Booking/index'
import { default as Chats } from './screen/chats/index'
import { default as Tracking } from './screen/Track/index'

import { tokenStorage } from './constant/request'
import { set_io_connection } from './redux/features/features.action'

const App = props => {
  const Stack = createStackNavigator()
  const [token, setToken] = useState(null)

  useEffect(() => {
    (async () => {
      const tokens = await tokenStorage()
      setToken(tokens)
    })()

  }, [])



  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Authentication" component={Authentication} options={{ headerShown: false }} />
        <Stack.Screen name="EditAds" component={EditAdsScreen} options={{ headerShown: false, animationEnabled: false, }} />
        <Stack.Screen name="Bookings" component={BookingScreen} />
        <Stack.Screen name="Chats" component={Chats} options={{ headerShown: false }} />
        <Stack.Screen name="Tracking" component={Tracking} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = createStructuredSelector({

})

const mapDispatchToProps = (dispatch) => ({
  set_io_connection: (data) => dispatch(set_io_connection(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);