import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import AddAds from './Add/add'
import EditAds from './Edit/edit'
import DeleteAds from './Delete/delete'

import AdsForm from './Screen/screen'

const EditAdsScreen = props => {
    const Tab = createMaterialTopTabNavigator()
    const Stack = createStackNavigator()

    const TabScreen = () => (
        <Tab.Navigator>
            <Tab.Screen name="Add-Ads" component={AddAds} />
            <Tab.Screen name="Edit-Ads" component={EditAds} />
            <Tab.Screen name="Delete-Ads" component={DeleteAds} />
        </Tab.Navigator>
    )

    return (
        <Stack.Navigator>
            <Stack.Screen name="Edit" children={TabScreen} options={{ title: 'Edit Ads', animationEnabled: false, }}/>
            <Stack.Screen name="Form" component={AdsForm} options={{ title: 'Add Product', animationEnabled: false, }}/>
        </Stack.Navigator>
    )
}

export default EditAdsScreen