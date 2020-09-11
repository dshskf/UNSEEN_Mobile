import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import Guides from './guides/guides'
import Tours from './tours/tours'

const Ads = props => {
    const Tab = createMaterialTopTabNavigator()
    const Stack = createStackNavigator()

    const TabNavigator = () => (
        <Tab.Navigator>
            <Tab.Screen name="Guides" component={Guides} />
            <Tab.Screen name="Tours" component={Tours} />
        </Tab.Navigator>
    )

    return (
        <Stack.Navigator>
            <Stack.Screen name="AdsContent" children={TabNavigator} />
        </Stack.Navigator>
    )
}

export default Ads