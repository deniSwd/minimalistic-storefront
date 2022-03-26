import React, { Component } from 'react'
import { connect } from 'react-redux'
import { currentAmountDown, currentAmountUp } from '../redux/cartReducer'
import { ProductForCart } from './ProductForCart'

export class Cart extends Component<any, any> {
  render() {
    console.log(this.props.selectedProducts)
    if (this.props.selectedProducts.length === 0) {
      return <div>CART EMPTY....</div>
    }
    return (
      <div>
        <div>MY CART, {this.props.selectedProducts.length} items</div>
        {this.props.selectedProducts.map((productInCart: any, i: number) => (
          <ProductForCart
            key={i}
            productInCart={productInCart}
            currentAmountDown={this.props.currentAmountDown}
            currentAmountUp={this.props.currentAmountUp}
            selectedCurrency={this.props.selectedCurrency}
          />
        ))}
        <div>TOTAL PRICE : {this.props.totalPrice}</div>
      </div>
    )
  }
}

let mapStateToProps = (state: any) => {
  return {
    selectedProducts: state.cartPage.currentCart.selectedProducts,
    selectedCurrency: state.categoryPage.selectedCurrency,
    totalPrice: state.cartPage.totalPrice,
  }
}
const CartPageContainer = connect(mapStateToProps, {
  currentAmountDown,
  currentAmountUp,
})(Cart)
export default CartPageContainer
