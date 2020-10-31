import React, { useEffect, useState } from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';

import GuideItem from '../../../components/Home/guides/guides.component'
import FilterAds from '../../../components/Home/filter.component'
import Spinner from '../../../components/Spinner/spinner'

import { get_tours_guides } from '../../../redux/tours/tours.action'
import { styles } from './style'

const Guides = props => {
    const [tours, setTours] = useState(null)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        fetch()
    }, [])

    const fetch = async () => {
        const tours = await props.get_tours_guides()
        setTours(tours.tours)
    }

    const GuidesComponent = (data) => <GuideItem {...data.item} />

    const refreshHandler = async () => {
        setRefresh(true)
        await fetch()
        setRefresh(false)
    }


    return (
        <View style={styles.container}>
            <FilterAds />
            {
                tours ?
                    <FlatList
                        keyExtractor={item => item.id.toString()}
                        data={tours}
                        renderItem={GuidesComponent}
                        numColumns={2}
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
    get_tours_guides: (data) => dispatch(get_tours_guides(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Guides);