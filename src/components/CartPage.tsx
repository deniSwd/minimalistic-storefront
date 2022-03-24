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
    return <div>
      <div>CART PAGE</div>
      {this.props.selectedProducts.map((productInCart:any) =>
        <ProductForCart productInCart = {productInCart}
                        currentAmountDown ={this.props.currentAmountDown}
                        currentAmountUp ={this.props.currentAmountUp}
                        selectedCurrency={this.props.selectedCurrency}
        />)}
    </div>
  }
}

let mapStateToProps = (state: any) => {
  return {
    selectedProducts: state.cartPage.currentCart.selectedProducts,
    selectedCurrency: state.categoryPage.selectedCurrency
  }
}
const CartPageContainer = connect(mapStateToProps, { currentAmountDown, currentAmountUp })(Cart)
export default CartPageContainer












