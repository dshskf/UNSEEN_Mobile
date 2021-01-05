import React, { useEffect, useState, useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import MapView from 'react-native-maps';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import * as Location from 'expo-location';

import { get_user_location, update_user_location } from '../../redux/features/features.action'
import io from 'socket.io-client'
import { API } from '../../constant/link'
import { userStorage } from '../../constant/request'
import { default as MCIcons } from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from './style'
import Carousel from '../../components/Carousel/carousel';
import { formatImage } from '../../constant/middleware';

const Articles = props => {
    return (
        <View style={styles.container}>
            <Carousel
                imageArr={[
                    'https://img.jakpost.net/c/2018/08/28/2018_08_28_52523_1535423807._large.jpg',
                    'https://www.travelprofessionalnews.com/wp-content/uploads/2019/08/Travel-Agent-News-for-Globuss.jpg',
                    'https://www.micechat.com/wp-content/uploads/2019/12/Disneyland-News-tomorrowland-crowds-star-tours-2.jpeg'
                ]}
                options={{ height: 400 }}
                isNews={true}
            />
            <ScrollView>
                <TouchableOpacity style={styles.itemBox}>
                    <View style={styles.imageBox}>
                        <Image style={styles.itemImage} source={{ uri: 'https://www.travelprofessionalnews.com/wp-content/uploads/2019/08/Travel-Agent-News-for-Globuss.jpg' }} />
                    </View>
                    <View style={styles.textBox}> 
                        <Text style={styles.itemTextHeader}>Lorem ipsum dolor sit amet</Text>
                        <Text style={styles.itemText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemBox}>
                    <View style={styles.imageBox}>
                        <Image style={styles.itemImage} source={{ uri: 'https://img.jakpost.net/c/2018/08/28/2018_08_28_52523_1535423807._large.jpg' }} />
                    </View>
                    <View style={styles.textBox}> 
                        <Text style={styles.itemTextHeader}>Lorem ipsum dolor sit amet</Text>
                        <Text style={styles.itemText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemBox}>
                    <View style={styles.imageBox}>
                        <Image style={styles.itemImage} source={{ uri: 'https://www.micechat.com/wp-content/uploads/2019/12/Disneyland-News-tomorrowland-crowds-star-tours-2.jpeg' }} />
                    </View>
                    <View style={styles.textBox}> 
                        <Text style={styles.itemTextHeader}>Lorem ipsum dolor sit amet</Text>
                        <Text style={styles.itemText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}


const mapStateToProps = createStructuredSelector({

})

const mapDispatchToProps = (dispatch) => ({
    get_user_location: (data) => dispatch(get_user_location(data)),
    update_user_location: (data) => dispatch(update_user_location(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Articles);