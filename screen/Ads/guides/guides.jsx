import React, { useEffect, useState, useRef } from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native'

import GuideItem from '../../../components/Home/guides/guides.component'
import FilterAds from '../../../components/Home/filter.component'
import Spinner from '../../../components/Spinner/spinner'

import { get_tours_guides } from '../../../redux/tours/tours.action'
import { styles } from './style'

const Guides = props => {
    const [tours, setTours] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(null)
    const isFocused = useIsFocused()
    const isFetch = useRef(false)


    useEffect(() => {
        isFetch.current = false
        fetch()
    }, [page])

    useEffect(() => {
        return () => setPage(1)
    }, [isFocused])

    const fetch = async () => {
        const tours = await props.get_tours_guides({ page: 1, is_mobile: true })
        setTotalPage(tours.total_page)
        setTours(tours.guides)
    }

    const GuidesComponent = (data) => <GuideItem parentProps={props} {...data.item} />

    const refreshHandler = async () => {
        setRefresh(true)
        await fetch()
        setRefresh(false)
    }

    const handleListPagination = () => {
        if (totalPage && page < totalPage) {
            isFetch.current = true
            setPage(page + 1)
        }
    }

    const loadPaginationSpinner = () => {
        return isFetch.current ? (<Spinner extStyle={styles.footerLoad} />) : null
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
                        onEndReached={handleListPagination}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={loadPaginationSpinner}
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