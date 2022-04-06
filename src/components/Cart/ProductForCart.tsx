import React, { Component } from 'react'
import { CurrencyType, PriceType, SelectedProductType } from '../../MainTypes'
import s from './productForCart.module.scss'
import { SliderForCart } from './SliderForCart'
import Preloader from '../../utilities/Preloader'

type ProductForCartPropsType = {
  productInCart: SelectedProductType
  currentAmountDown: (amountOfProduct: number, productId: string) => void
  currentAmountUp: (amountOfProduct: number, productId: string) => void
  selectedCurrency: CurrencyType
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
    const currentPrice = this.getPrice()
    if (!this.props.productInCart.product ) {
      return <Preloader />
    }
    return (
      <div className={s.selectedProduct}>
        <div>
          <div className={s.brand}>
            {this.props.productInCart.product.brand}
          </div>
          <div className={s.name}>
            {this.props.productInCart.product.name}
          </div>
          <div>
            {currentPrice && currentPrice.currency.symbol} {currentPrice && currentPrice.amount}
          </div>
          <div>Attribute</div>
          {Object.entries(this.props.productInCart.currentItem).map(
            ([attribute, itemValues], i: number) => (
              <div className={s.currentAttributes} key={i}>
                <div>{attribute}:</div>
                {attribute === 'Color' ? (
                  <div className={s.currentItemElement}
                    style={{ backgroundColor: itemValues.value }} />
                ) : (
                  <div className={s.currentItemElement}>{itemValues.value}</div>)}
              </div>
            )
          )}
        </div>
        <div className={s.amountAndGallery}>
          <div className={s.amount}>
            <button onClick={() => this.props.productInCart.product && this.amountUp(
                  this.props.productInCart.amount,
                  this.props.productInCart.product.id)
              }
            >
              +
            </button>
            <div>{this.props.productInCart.amount}</div>
            <button onClick={() => this.props.productInCart.product && this.amountDown(
                  this.props.productInCart.amount,
                  this.props.productInCart.product.id
                )
              }
            >
              -
            </button>
          </div>
          <div>
            <SliderForCart gallery={this.props.productInCart.product.gallery} />
          </div>
        </div>
      </div>
    )
  }
}
