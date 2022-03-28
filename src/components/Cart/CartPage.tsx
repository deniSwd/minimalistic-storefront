import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../redux/cartReducer'
import { ProductForCart } from './ProductForCart'
import TotalPriceContainer from './TotalPrice'

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
            currentAmountDown={this.props.setCurrentAmountDown}
            currentAmountUp={this.props.setCurrentAmountUp}
            selectedCurrency={this.props.selectedCurrency}
          />
        ))}
        <div><TotalPriceContainer/></div>
      </div>
    )
  }
}

let mapStateToProps = (state: any) => {
  return {
    selectedProducts: state.cartPage.currentCart.selectedProducts,
    selectedCurrency: state.categoryPage.selectedCurrency,
  }
}
const CartPageContainer = connect(mapStateToProps, { ...actions })(Cart)
export default CartPageContainer
