import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';

import ToursItem from '../../../components/Home/tours/tours.component'
import FilterAds from '../../../components/Home/filter.component'
import Spinner from '../../../components/Spinner/spinner'

import { get_product } from '../../../redux/products/products.action'
import { styles } from './style'


const Tours = props => {
    const [products, setProducts] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            const products = await props.getProductData()
            setProducts(products.product)
        }
        fetch()
    }, [])

    return (
        <View style={styles.container}>
            <FilterAds />
            {
                products ?
                    <View style={styles.content} >
                        {
                            products.map(data => (
                                <ToursItem key={data.id}  {...data} />
                            ))
                        }
                    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Tours);