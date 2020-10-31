import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Message from './message/message'
import Contact from './list/list'
import Notification from './notification/notification'
import { color } from '../../constant/style'
import { default as IonicIcon } from 'react-native-vector-icons/Ionicons'
import { default as AntIcon } from 'react-native-vector-icons/AntDesign'

const Chats = props => {
    const Stack = createStackNavigator()
    const Tab = createMaterialTopTabNavigator()

    const TabNavigator = () => (
        <Tab.Navigator tabBarOptions={{
            labelStyle: { fontSize: 12 },
            activeTintColor: 'white',
            showIcon: true,
            indicatorStyle: { backgroundColor: 'white', elevation: 4 },
            tabStyle: { flexDirection: 'row' },
            style: { backgroundColor: color.primary },
        }}>
            <Tab.Screen name="List" component={Contact} options={{
                tabBarLabel: "Chats",
                tabBarIcon: ({ focused, color }) => (
                    <AntIcon name="message1" focused={focused} color={color} size={22} />
                ),
            }} />
            <Tab.Screen name="Notification" component={Notification} options={{
                tabBarIcon: ({ focused, color }) => (
                    <IonicIcon name="md-notifications" focused={focused} color={color} size={22} />
                ),
            }} />
        </Tab.Navigator>
    )

    return (
        <Stack.Navigator>
            <Stack.Screen name="Contact" children={TabNavigator} />
            <Stack.Screen name="Message" component={Message} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Chats