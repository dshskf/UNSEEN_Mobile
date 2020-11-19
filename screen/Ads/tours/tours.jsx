import React, { useEffect, useRef, useState } from 'react'
import { View, FlatList, RefreshControl, Dimensions } from 'react-native'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native'

import ToursItem from '../../../components/Home/tours/tours.component'
import FilterAds from '../../../components/Home/filter.component'
import Spinner from '../../../components/Spinner/spinner'

import { get_tours_agency } from '../../../redux/tours/tours.action'
import { styles } from './style'



const Tours = props => {
    const [tours, setTours] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(null)
    
    const isFocused = useIsFocused()
    const isFetch = useRef(false)

    useEffect(() => {
        return () => setPage(1)
    }, [isFocused])

    useEffect(() => {
        isFetch.current = false
        fetch()
    }, [page])

    const fetch = async () => {
        const tours = await props.get_tours_agency({ page: page, is_mobile: true })
        setTotalPage(tours.total_page)
        setTours(tours.tours)
    }

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


    const ToursComponent = (data) => <ToursItem
        {...data.item}
        parentProps={props}
        navScreen={"ToursDetails"}        
    />

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
                        // onScroll={handleListPagination}
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
    get_tours_agency: (data) => dispatch(get_tours_agency(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Tours);