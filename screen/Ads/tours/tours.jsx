import React, { useEffect, useState } from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';

import ToursItem from '../../../components/Home/tours/tours.component'
import FilterAds from '../../../components/Home/filter.component'
import Spinner from '../../../components/Spinner/spinner'

import { get_tours_agency } from '../../../redux/tours/tours.action'
import { styles } from './style'



const Tours = props => {
    const [tours, setTours] = useState(null)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        fetch()
    }, [])

    const fetch = async () => {
        const tours = await props.get_tours_agency()
        setTours(tours.tours)
    }

    const refreshHandler = async () => {
        setRefresh(true)
        await fetch()
        setRefresh(false)
    }


    const ToursComponent = (data) => <ToursItem {...data.item} parentProps={props} navScreen={"ToursDetails"} />

    return (
        <View style={styles.container}>
            <FilterAds />
            {
                tours ?
                    <FlatList
                        keyExtractor={item => item.id.toString()}
                        data={tours}
                        renderItem={ToursComponent}
                        style={{ flex: 1 }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refresh}
                                onRefresh={refreshHandler}
                            />
                        }
                    />
                    :
                    <Spinner />
            }

        </View>
    )
}

const mapStateToProps = createStructuredSelector({

})

const mapDispatchToProps = (dispatch) => ({
    get_tours_agency: (data) => dispatch(get_tours_agency(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Tours);