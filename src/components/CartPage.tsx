import React, { Component } from 'react'
import { connect } from 'react-redux'
import s from './cartPage.module.scss'
import { SliderForCart } from './SliderForCart'
import { currentAmountDown, currentAmountUp } from '../redux/cartReducer'
import { PriceType } from '../MainTypes'

export class Cart extends Component<any, any> {

  amountDown = (amountOfProduct: number, productId: number) => {
    this.props.currentAmountDown(amountOfProduct, productId)
  }
  amountUp = (amountOfProduct: number, productId: number) => {
    this.props.currentAmountUp(amountOfProduct, productId)
  }

  getPrice(): PriceType {
    return this.props.selectedProducts[0].product.prices.find((u: any) => u.currency.symbol === this.props.selectedCurrency.symbol)
  }

  render() {
    console.log(this.props.selectedProducts)
    if (this.props.selectedProducts.length === 0) {
      return <div>CART EMPTY....</div>
    }
    const currentPrice = this.getPrice()
    return <div>
      <div>CART PAGE</div>
      {this.props.selectedProducts.map((productInCart:any) =>
        <div className={s.selectedProduct}>
          <div>
            <div>{productInCart.product.brand}</div>
            <div>{productInCart.product.name}</div>
            <div>{currentPrice.currency.symbol} {currentPrice.amount}</div>
            <div>Attribute</div>
          </div>
          <div className={s.amountAndGallery}>
            <div className={s.amount}>
              <button onClick={() => this.amountUp(productInCart.amount,productInCart.product.id)}>+</button>
              <div>{productInCart.amount}</div>
              <button onClick={() => this.amountDown(productInCart.amount,productInCart.product.id)}>-</button>
            </div>
            <div>
              <SliderForCart gallery={productInCart.product.gallery} />
            </div>
          </div>
        </div>
      )}
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












