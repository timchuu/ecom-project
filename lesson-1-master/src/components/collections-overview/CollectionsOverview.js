import React from 'react'
import CollectionPreview from '../collection_preview/CollectionPreview'
import { selectCollectionsForPreview } from '../../redux/shop/shop_selectors'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import './collections_overview.scss'

const CollectionsOverview = ({ collections }) => {
    return (
        <div className='collections-overview'>
            {
                collections.map(({ id, ...otherCollectionProps }) => (
                    <CollectionPreview key={id} {...otherCollectionProps} />
                ))
            }
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview)
