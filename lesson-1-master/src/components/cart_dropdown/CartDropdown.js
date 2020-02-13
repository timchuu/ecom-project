import React from 'react'
import { connect } from 'react-redux'
import { selectCartItems } from '../../redux/cart/cart_selectors'
import CartItem from '../cart_item/CartItem'
import CustomButton from '../custom_button/CustomButton'
import './cart_dropdown.scss'

const CartDropdown = ({ cartItems }) => {
    return (
        <div className='cart-dropdown'>
            <div className='cart-items' >
                {
                    cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
                }
            </div>
            <CustomButton>GO TO CHECKOUT</CustomButton>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
})

export default connect(mapStateToProps)(CartDropdown)