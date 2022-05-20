import React, { Component } from 'react'
import s from './productForCategories.module.scss'
import { NavLink } from 'react-router-dom'
import { AttributeSetType, CurrencyType, PriceType } from '../../../MainTypes'
import cartButtonImg from '../../../assets/cartButton.svg'
import { getPrice } from '../../../utilities/getPrice'

type ProductForCategoriesType = {
  name: string
  image: string
  id: string
  brand: string
  inStock: boolean
  prices: Array<PriceType>
  attributes: Array<AttributeSetType>
  addProduct: (productId: string) => void
  selectedCurrency: CurrencyType
  setAttributesField: (productId: string) => void
}

export class ProductForCategories extends Component<ProductForCategoriesType> {

  render() {
    const currentPrice = getPrice(this.props.prices, this.props.selectedCurrency.symbol)
    return (
      <div className={s.productWrapper}>
        {this.props.inStock &&
          <div className={s.addToCartButton} onClick={() =>
            this.props.attributes.length < 1 ?
              this.props.addProduct(this.props.id) : this.props.setAttributesField(this.props.id)}>
            <img src={cartButtonImg} alt='' />
          </div>}
        <div className={s.productStyle}>
          <NavLink to={`/productPage/${this.props.id}`}>
            {!this.props.inStock &&
              <div className={s.outOfStock}>
                <div className={s.text}>
                  OUT OF STOCK
                </div>
              </div>}
            <div>
              <img src={this.props.image} className={s.img} alt='' />
            </div>
            <div className={s.content}>
              <div className={s.name}>
                {this.props.brand} {this.props.name}
              </div>
              <div className={s.price}>
                {currentPrice && currentPrice.currency.symbol}
                {currentPrice && currentPrice.amount}
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    )
  }
}
