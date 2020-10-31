import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
// import io from 'socket.io-client'
// import { API } from '../../constant/request'

const Articles = props => {
    const [coords, setCoords] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
            setCoords({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
        })();
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ width: '100%', height: '50%' }}
                initialRegion={{
                    latitude: coords.lat,
                    longitude: coords.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: coords.lat,
                        longitude: coords.lng,
                    }}
                    title={"Super"}
                    description={"metadata"}
                />
            </MapView>
            <Text style={{ fontSize: 30 }} onPress={() => {
                setCoords({ ...coords, lat: coords.lat + 0.01 })
            }}>Next</Text>
        </View>
    )
}


export default Articles