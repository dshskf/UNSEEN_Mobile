import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from './login'
import RegisterScreen from './register'


const Authentication = props => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />            
        </Stack.Navigator>
    )
}

export default Authentication
