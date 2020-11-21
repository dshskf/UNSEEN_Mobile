import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

import ProfileHeader from '../../../components/Profile/header/header'
import ProfileBox from '../../../components/Profile/box/box'
import ProfileList from '../../../components/Profile/list'
import Spinner from '../../../components/Spinner/spinner'

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';

import { get_edit_profile as get_profile } from '../../../redux/user/user.action'
import { styles } from './style'
import { useIsFocused } from '@react-navigation/native'

const ProfileMainScreen = props => {
    const [user, setUser] = useState(null)
    const { navigation } = props
    const isFocused = useIsFocused()

    useEffect(() => {
        (async () => {
            fetch()
        })()
    }, [isFocused])

    const fetch = async () => {
        const getUser = await props.get_profile()
        setUser(getUser.data)
    }

    return user ?
        (
            <View style={styles.container}>
                <ProfileHeader {...user} navigation={() => navigation.navigate('Chats')} />
                <ProfileBox {...props} />
                <ProfileList {...props} />
            </View>
        )
        :
        (<Spinner />)
}

const mapStateToProps = createStructuredSelector({

})

const mapDispatchToProps = (dispatch) => ({
    get_profile: (data) => dispatch(get_profile(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMainScreen);