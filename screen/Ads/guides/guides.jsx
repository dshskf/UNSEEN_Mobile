import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';

import GuideItem from '../../../components/Home/guides/guides.component'
import FilterAds from '../../../components/Home/filter.component'
import Spinner from '../../../components/Spinner/spinner'

import { get_product } from '../../../redux/products/products.action'
import { styles } from './style'



const Guides = props => {
    const [products, setProducts] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            const products = await props.getProductData()            
            setProducts(products.product)
        }
        fetch()

    }, [])

    const GuidesComponent = (data) => <GuideItem {...data.item} />


    return (

        <View style={styles.container}>
            <FilterAds />
            {
                products ?
                    <FlatList
                        keyExtractor={item => item.id.toString()}
                        data={products}
                        renderItem={GuidesComponent}
                        numColumns={2}
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

export default connect(mapStateToProps, mapDispatchToProps)(Guides);