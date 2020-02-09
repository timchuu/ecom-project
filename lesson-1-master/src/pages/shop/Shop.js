import React, { Component } from 'react'
import CollectionsPreview from '../../components/collection/Collection'
import SHOP_DATA from './shop.data'


class Shop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collections: SHOP_DATA
        }
    }
    render() {
        const { collections } = this.state
        return (
            <div className='shop-page'>
                {
                    collections.map(({ id, ...otherCollectionProps }) => (
                        <CollectionsPreview key={id} {...otherCollectionProps} />
                    ))
                }
            </div>
        )
    }
}

export default Shop
