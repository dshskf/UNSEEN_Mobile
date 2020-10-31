import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ads from './Ads/index'
import Articles from './Article/article'
import Request from './Request/request'
import Profile from './Profile/profile'
import Chats from './chats/index'
import Icon from 'react-native-vector-icons/FontAwesome'

import { color } from '../constant/style'

const Home = props => {
    const Bottom = createBottomTabNavigator()

    const options = (name, label) => ({
        tabBarLabel: label,
        tabBarIcon: ({ focused, color, size }) => (
            <Icon name={name} focused={focused} color={color} size={size} />
        ),
    })

    const tabBarOptions = {
        activeTintColor: color.primary,
        inactiveTintColor: 'gray'
    }

    return (
        <Bottom.Navigator tabBarOptions={tabBarOptions}>
            <Bottom.Screen
                name="Ads"
                component={Ads}
                options={() => options('home', 'Home')}
            />
            <Bottom.Screen
                name="Articles"
                component={Articles}
                options={() => options('newspaper-o', 'Article')}
            />
            <Bottom.Screen
                name="Request"
                component={Chats}
                options={() => options('inbox', 'Request')}
            />
            <Bottom.Screen
                name="Profile"
                component={Profile}
                options={() => options('user', 'Profile')}
            />
        </Bottom.Navigator>
    )
}

export default Home