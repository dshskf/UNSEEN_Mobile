import React, { useEffect, useState, useRef } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import * as Location from 'expo-location';

import { get_user_location, update_user_location } from '../../../redux/features/features.action'
import io from 'socket.io-client'
import { API } from '../../../constant/link'
import { userStorage } from '../../../constant/request'
import { default as MCIcons } from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from './style'
import { useIsFocused } from '@react-navigation/native';

const Tracking = props => {
    const [permission, setPermission] = useState(false)
    const [user, setUser] = useState(null)
    const [opponents, setOpponents] = useState(null)
    const [region, setRegion] = useState(null)

    const tempUser = useRef()
    const tempOpponent = useRef()
    const tempRegion = useRef()
    const tempCoords = useRef()
    const socket = useRef()
    const isFocused = useIsFocused()

    useEffect(() => {
        (async () => {
            const storage = await userStorage();
            const fetch = await props.get_user_location({
                booking_id: props.route.params.booking_id,
                receiver_type: props.route.params.receiver_type
            })

            let user_data = fetch.data.filter(data => {
                if (data.type === storage.typeCode) {
                    data.lat = parseFloat(data.lat)
                    data.lng = parseFloat(data.lng)
                    return data
                }
            })[0]
            let opponents_data = fetch.data.filter(data => {
                if (data.type !== storage.typeCode) {
                    data.lat = parseFloat(data.lat)
                    data.lng = parseFloat(data.lng)
                    return data
                }
            })[0]


            let region_data = {
                latitude: user_data.lat,
                longitude: user_data.lng,
                latitudeDelta: 5,
                longitudeDelta: 5,
            }

            tempUser.current = user_data
            tempOpponent.current = opponents_data
            tempRegion.current = region_data

            setUser(user_data)
            setOpponents(opponents_data)
            setRegion(region_data)


            // Set Socket            
            let io_conn = io(API)
            io_conn.emit('join_room', {
                room_id: `${storage.id}-${storage.typeCode}`
            })
            io_conn.on('new_location', async data => {
                updateLocationOnSocket(data)
            })
            socket.current = io_conn
            getLocation()
        })();

        return async () => {
            await props.update_user_location({
                lat: tempCoords.current.lat,
                lng: tempCoords.current.lng,
            })
            socket.current.disconnect()
        };
    }, [isFocused])

    const updateLocationOnSocket = async (opponents_data) => {
        console.log(opponents_data)
        if (opponents_data.lat !== tempOpponent.current.lat || opponents_data.lng !== tempOpponent.current.lng) {
            tempOpponent.current = { ...tempOpponent.current, lat: opponents_data.lat, lng: opponents_data.lng }
            setOpponents(tempOpponent.current)
        }
    }

    const getLocation = async () => {
        if (!permission) {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
            }
        }
        let location = await Location.getCurrentPositionAsync();
        const new_location = {
            lat: location.coords.latitude,
            lng: location.coords.longitude
        }

        tempCoords.current = new_location;
        setPermission(true)
    }

    const calculateCenteredView = (u_lat, u_lng, o_lat, o_lng) => {
        const distance_lat = u_lat - o_lat
        const distance_lng = Math.abs(u_lng) - Math.abs(o_lng)

        // Calculate maps centered
        const center_lat = ((distance_lat / 2) - u_lat) * -1
        const center_lng = u_lng - (distance_lng / 2)

        return { lat: center_lat, lng: center_lng }
    }

    const calculateZoomLevel = (u_lat, u_lng, o_lat, o_lng) => {
        const distance_lat = u_lat - o_lat;
        const distance_lng = Math.abs(u_lng) - Math.abs(o_lng)
        let calculatedDistance = Math.sqrt(Math.pow(distance_lng, 2) + Math.pow(distance_lat, 2))

        return calculatedDistance < 5 ? calculatedDistance * 1.4 : calculatedDistance + 2

    }

    const handleUserLocationChanges = async (coordinate) => {
        const { latitude, longitude } = coordinate.nativeEvent.coordinate
        const new_location = { lat: latitude, lng: longitude }

        tempCoords.current = new_location;
        const new_user = { ...user, lat: new_location.lat, lng: new_location.lng }

        setUser(new_user)
        tempUser.current = new_user
       

        if (Math.abs(latitude) - Math.abs(user.lat) > 0.00001 || Math.abs(longitude) - Math.abs(user.lng) > 0.00001) {
            socket.current.emit('update_location', {
                ...new_location,
                opposite_id: `${opponents.id}-${opponents.type}`
            })       
            await props.update_user_location({
                lat: new_location.lat,
                lng: new_location.lng,
            })    
        }
    }

    const handleOnFocus = () => {
        let centerPosition = calculateCenteredView(user.lat, user.lng, opponents.lat, opponents.lng)
        let centerZoom = calculateZoomLevel(user.lat, user.lng, opponents.lat, opponents.lng)
        setRegion({
            latitude: centerPosition.lat,
            longitude: centerPosition.lng,
            latitudeDelta: centerZoom,
            longitudeDelta: centerZoom,
        })
    }


    return (
        <View style={styles.container}>
            {
                region && <MapView
                    style={styles.map}
                    region={region}
                    followsUserLocation={true}
                    showsUserLocation={true}
                    onUserLocationChange={handleUserLocationChanges}
                >
                    {
                        opponents && <MapView.Marker
                            coordinate={{
                                latitude: parseFloat(opponents.lat),
                                longitude: parseFloat(opponents.lng),
                            }}
                            title={"Super"}
                            description={"metadata"}
                        />
                    }

                </MapView>
            }
            <TouchableOpacity activeOpacity={0.8} style={styles.focusBox} onPress={handleOnFocus}>
                <MCIcons name="target-account" size={30} color="white" />
            </TouchableOpacity>

        </View>
    )
}


const mapStateToProps = createStructuredSelector({

})

const mapDispatchToProps = (dispatch) => ({
    get_user_location: (data) => dispatch(get_user_location(data)),
    update_user_location: (data) => dispatch(update_user_location(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Tracking);