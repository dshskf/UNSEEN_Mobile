import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './screen/home'
import Authentication from './screen/Authentication'
import EditAdsScreen from './screen/Edit-Ads'
import BookingScreen from './screen/Booking/booking'
import Chats from './screen/chats/index'
import Tracking from './screen/Track/track'

import { tokenStorage, userStorage, API } from './constant/request'
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