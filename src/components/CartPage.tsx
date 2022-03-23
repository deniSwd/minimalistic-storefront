import React, { Component } from 'react'
import { connect } from 'react-redux'
import s from './cartPage.module.scss'
import { SliderForCart } from './SliderForCart'
import { currentAmountDown, currentAmountUp } from '../redux/cartReducer'
import { PriceType } from '../MainTypes'

export class Cart extends Component<any, any> {

  amountDown = (amountOfProduct: number) => {
    this.props.currentAmountDown(amountOfProduct)
  }
  amountUp = (amountOfProduct: number) => {
    this.props.currentAmountUp(amountOfProduct)
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
      <div className={s.selectedProduct}>
        <div>
          <div>{this.props.selectedProducts[0].product.brand}</div>
          <div>{this.props.selectedProducts[0].product.name}</div>
          <div>{currentPrice.currency.symbol} {currentPrice.amount}</div>
          <div>Attribute</div>
        </div>
        <div className={s.amountAndGallery}>
          <div className={s.amount}>
            <button onClick={() => this.amountUp(this.props.currentAmount)}>+</button>
            <div>{this.props.currentAmount}</div>
            <button onClick={() => this.amountDown(this.props.currentAmount)}>-</button>
          </div>
          <div>
            <SliderForCart gallery={this.props.selectedProducts[0].product.gallery} /> {/*пока передаем только первый продукт в корзину*/}
          </div>
        </div>
      </div>
    </div>
  }
}

let mapStateToProps = (state: any) => {
  return {
    selectedProducts: state.cartPage.currentCart.selectedProducts,
    currentAmount: state.cartPage.currentCart.currentAmount,
    selectedCurrency: state.categoryPage.selectedCurrency
  }
}
const CartPageContainer = connect(mapStateToProps, { currentAmountDown, currentAmountUp })(Cart)
export default CartPageContainer












