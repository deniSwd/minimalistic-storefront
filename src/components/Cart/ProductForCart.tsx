import React, { Component } from 'react'
import { CurrencyType, PriceType, SelectedProductType } from '../../MainTypes'
import s from './productForCart.module.scss'
import { SliderForCart } from './SliderForCart'
import Preloader from '../../utilities/Preloader'
import v from './productForOverlay.module.scss'

type ProductForCartPropsType = {
  productInCart: SelectedProductType
  currentAmountDown: (amountOfProduct: number, productId: string) => void
  currentAmountUp: (amountOfProduct: number, productId: string) => void
  selectedCurrency: CurrencyType
  anotherStyle:boolean
}

export class ProductForCart extends Component<ProductForCartPropsType> {
  amountDown = (amountOfProduct: number, productId: string) => {
    this.props.currentAmountDown(amountOfProduct, productId)
  }
  amountUp = (amountOfProduct: number, productId: string) => {
    this.props.currentAmountUp(amountOfProduct, productId)
  }

  getPrice(): PriceType | undefined {
    if (this.props.productInCart.product != null) {
      return this.props.productInCart.product.prices.find(
        (u: PriceType) => u.currency.symbol === this.props.selectedCurrency.symbol
      )
    }

  }

  render() {
    let style = s
    this.props.anotherStyle ? style = v : style
    const currentPrice = this.getPrice()
    if (!this.props.productInCart.product ) {
      return <Preloader />
    }
    return (
      <div className={style.selectedProduct}>
        <div>
          <div className={style.brand}>
            {this.props.productInCart.product.brand}
          </div>
          <div className={style.name}>
            {this.props.productInCart.product.name}
          </div>
          <div className={style.price}>
            {currentPrice && currentPrice.currency.symbol} {currentPrice && currentPrice.amount}
          </div>
          {Object.entries(this.props.productInCart.currentItem).map(
            ([attribute, itemValues], i: number) => (
              <div className={style.currentAttributes} key={i}>
                <div className={style.attributeName}>{attribute}:</div>
                {attribute === 'Color' ? (
                  <div className={style.currentItemElement}
                    style={{ backgroundColor: itemValues.value }} />
                ) : (
                  <div className={style.currentItemElement}>{itemValues.value}</div>)}
              </div>
            )
          )}
        </div>
        <div className={style.amountAndGallery}>
          <div className={style.amount}>
            <button onClick={() => this.props.productInCart.product && this.amountUp(
                  this.props.productInCart.amount,
                  this.props.productInCart.product.id)
              }
            >
              +
            </button>
            <div className={style.amountNumber}>{this.props.productInCart.amount}</div>
            <button onClick={() => this.props.productInCart.product && this.amountDown(
                  this.props.productInCart.amount,
                  this.props.productInCart.product.id
                )
              }
            >
              –
            </button>
          </div>
          <div>
            <SliderForCart gallery={this.props.productInCart.product.gallery}
                           anotherStyle ={this.props.anotherStyle}/>
          </div>
        </div>
      </div>
    )
  }
}
