import React, { useEffect, useState } from 'react'
import { View, FlatList, Text, TouchableOpacity } from 'react-native'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';

import ToursItem from '../../../components/Home/tours/tours.component'
import Spinner from '../../../components/Spinner/spinner'

import { get_tours_dashboard } from '../../../redux/tours/tours.action'
import { styles } from './style'


const Ads = props => {
    const [tours, setTours] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            const tours = await props.get_tours_dashboard({ type: 'agency' })
            setTours(tours.tours)
        }
        fetch()
    }, [])

    const ToursComponent = (data) => <ToursItem {...data.item} parentProps={props} navScreen={'Form'} />

    return (
        <View style={styles.container}>
            {
                tours ?
                    <FlatList
                        keyExtractor={item => item.id.toString()}
                        data={tours}
                        renderItem={ToursComponent}
                        style={{ flex: 1 }}
                    />
                    :
                    <Spinner />
            }
            <TouchableOpacity
                activeOpacity={.9}
                onPress={() => props.navigation.navigate('Form')}                
                style={styles.addBox}
            >
                <Text style={styles.addText}>+ Add Tours</Text>
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = createStructuredSelector({

})

const mapDispatchToProps = (dispatch) => ({
    get_tours_dashboard: (data) => dispatch(get_tours_dashboard(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Ads);