import React from 'react'

import { default as FAIcon5 } from 'react-native-vector-icons/FontAwesome5'
import { default as FAIcon } from 'react-native-vector-icons/FontAwesome'
import { default as MCIcons } from 'react-native-vector-icons/MaterialCommunityIcons'

import { color } from '../../constant/style'
import { styles } from './style'
import { API } from '../../constant/request'

import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'

const BookingCard = props => {
    const iconSize = 24

    const icon = (name) => {
        let color = "white"
        let size = 18
        return props.is_active ?
            <FAIcon5 name={name} color={color} size={size} />
            :
            props.is_payed ?
                <FAIcon5 name={name} color={color} size={size} />
                :
                <MCIcons name={name} color={color} size={size} />
    }

    const button = props.is_active ?
        { icon: () => icon('map-marker-alt'), label: 'Track', opacity: 1, color: color.primary }
        :
        props.is_payed ?
            { icon: () => icon('money-check'), label: 'Paid', opacity: 0.8, color: color.button_1 }
            :
            { icon: () => icon('timer-sand'), label: 'Unpaid', opacity: 0.8, color: color.grey_1 }

    return (
        <View style={styles.container}>
            <View style={styles.cardBox}>
                <View style={styles.imageBox}>
                    <Image
                        source={{ uri: API + props.ads_image[0].replace('\\', '/') }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>{props.ads_title}</Text>
                </View>
                <View style={styles.detailBox}>
                    <View style={styles.detailLeft}>
                        <View style={styles.iconBox}>
                            <FAIcon5 name="dollar-sign" color={color.primary} size={iconSize} />
                        </View>
                        <View style={styles.dataBox}>
                            <Text style={styles.dataTitle}>Price</Text>
                            <Text style={styles.dataInfo}>{props.ads_price}</Text>
                        </View>
                    </View>
                    <View style={styles.detailRight}>
                        <View style={styles.iconBox}>
                            <FAIcon name="calendar" color={color.primary} size={iconSize} />
                        </View>
                        <View style={styles.dataBox}>
                            <Text style={styles.dataTitle}>Date</Text>
                            <Text style={{ ...styles.dataInfo, fontSize: 12 }}>{props.ads_start_date.split('T')[0]}</Text>
                        </View>
                    </View>
                    <View style={styles.detailLeft}>
                        <View style={styles.iconBox}>
                            <FAIcon5 name="wallet" color={color.primary} size={iconSize} />
                        </View>
                        <View style={styles.dataBox}>
                            <Text style={styles.dataTitle}>Status</Text>
                            <Text style={{ ...styles.dataInfo, fontSize: 12 }}>{props.is_payed ? 'Paid' : 'Unpaid'}</Text>
                        </View>
                    </View>
                    <View style={styles.detailRight}>
                        <View style={styles.iconBox}>
                            <FAIcon name="map-o" color={color.primary} size={iconSize} />
                        </View>
                        <View style={styles.dataBox}>
                            <Text style={styles.dataTitle}>Username</Text>
                            <Text style={{ ...styles.dataInfo, fontSize: 12 }}>{props.user_username}</Text>
                        </View>
                    </View>

                </View>
                <TouchableOpacity onPress={() => props.action(props.id, props.is_payed, props.is_active)} style={{ ...styles.buttonBox, backgroundColor: button.color }} activeOpacity={button.opacity}>
                    {/* <FAIcon5 name={button.icon} /> */}
                    {button.icon()}
                    <Text style={styles.button}>{button.label}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BookingCard