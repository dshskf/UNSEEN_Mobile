import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import Guides from './guides/guides'
import Tours from './tours/tours'
import { default as ToursDetails } from './tours/details/details'
import { default as GuidesDetails } from './guides/details/details'

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
            <Stack.Screen name="AdsTab" children={TabNavigator} options={{ headerLeft: null, title: 'Tours' }} />
            <Stack.Screen name="GuidesDetails" component={GuidesDetails} options={{ headerShown: false }} />
            <Stack.Screen name="ToursDetails" component={ToursDetails} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Ads