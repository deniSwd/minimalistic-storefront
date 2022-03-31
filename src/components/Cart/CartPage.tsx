import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { actions, ActionsType } from '../../redux/cartReducer'
import { ProductForCart } from './ProductForCart'
import TotalPriceContainer from './TotalPrice'
import { AppStateType } from '../../redux/redux-store'
import { SelectedProductType } from '../../MainTypes'

export class Cart extends Component<CartPageProps> {
  render() {
    if (this.props.selectedProducts.length === 0) {
      return <div>CART EMPTY....</div>
    }
    return (
      <div>
        <div>MY CART, {this.props.selectedProducts.length} items</div>
        {this.props.selectedProducts.map((productInCart: SelectedProductType, i: number) => (
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

let mapStateToProps = (state: AppStateType) => {
  return {
    selectedProducts: state.cartPage.currentCart.selectedProducts,
    selectedCurrency: state.categoryPage.selectedCurrency,
  }
}
const connector = connect(mapStateToProps, { ...actions })
const CartPageContainer = connector(Cart)

type CartPageProps = ConnectedProps<typeof connector>

export default CartPageContainer
