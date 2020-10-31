import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import Ads from './Ads/ads'

import AdsForm from './Form/form'

const EditAdsScreen = props => {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen name="Edit" component={Ads} options={{ title: 'Edit Ads', animationEnabled: false, }} />
            <Stack.Screen name="Form" component={AdsForm} options={{ title: 'Add Product', animationEnabled: false, }} />
        </Stack.Navigator>
    )
}

export default EditAdsScreen