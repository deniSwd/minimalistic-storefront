import React, { Component } from 'react'
import { PriceType } from '../MainTypes'
import s from './cartPage.module.scss'
import { SliderForCart } from './SliderForCart'

export class ProductForCart extends Component<any, any> {

  amountDown = (amountOfProduct: number, productId: number) => {
    this.props.currentAmountDown(amountOfProduct, productId)
  }
  amountUp = (amountOfProduct: number, productId: number) => {
    this.props.currentAmountUp(amountOfProduct, productId)
  }


  getPrice(): PriceType {
    return this.props.productInCart.product.prices.find((u: any) => u.currency.symbol === this.props.selectedCurrency.symbol)
  }

  render() {
    const currentPrice = this.getPrice()
    return <div className={s.selectedProduct}>
      <div>
        <div>{this.props.productInCart.product.brand}</div>
        <div>{this.props.productInCart.product.name}</div>
        <div>{currentPrice.currency.symbol} {currentPrice.amount}</div>
        <div>Attribute</div>
      </div>
      <div className={s.amountAndGallery}>
        <div className={s.amount}>
          <button onClick={() => this.amountUp(this.props.productInCart.amount,this.props.productInCart.product.id)}>+</button>
          <div>{this.props.productInCart.amount}</div>
          <button onClick={() => this.amountDown(this.props.productInCart.amount,this.props.productInCart.product.id)}>-</button>
        </div>
        <div>
          <SliderForCart gallery={this.props.productInCart.product.gallery} />
        </div>
      </div>
    </div>
  }
}