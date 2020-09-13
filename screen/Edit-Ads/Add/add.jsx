import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';

import ToursItem from '../../../components/Home/tours/tours.component'
import Spinner from '../../../components/Spinner/spinner'

import { get_product } from '../../../redux/products/products.action'
import { styles } from './style'


const AddAds = props => {
    const [products, setProducts] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            const products = await props.getProductData()
            setProducts(products.product)
        }
        fetch()
    }, [])

    const ToursComponent = (data) => <ToursItem {...data.item} parentProps={props} navScreen={'Form'} />

    return (
        <View style={styles.container}>
            {
                products ?
                    <FlatList
                        keyExtractor={item => item.id.toString()}
                        data={products}
                        renderItem={ToursComponent}
                        style={{ flex: 1 }}
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
    getProductData: (data) => dispatch(get_product(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddAds);