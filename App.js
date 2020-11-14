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

import { tokenStorage, userStorage, API } from './constant/request'
import { set_io_connection } from './redux/features/features.action'

const App = props => {
  const Stack = createStackNavigator()
  const [token, setToken] = useState(null)

  useEffect(() => {
    (async () => {
      const tokens = await tokenStorage()
      // let user = await userStorage()
      // if (tokens && user) {        
      //   let socket = io(API)
      //   socket.emit('join_room', {
      //     room_id: `${user.id}-${user.type[0].toUpperCase()}`
      //   })
      //   props.set_io_connection(socket)
      // }
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