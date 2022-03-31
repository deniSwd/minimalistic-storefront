import React, { Component } from 'react'
import s from './product.module.scss'
import { NavLink } from 'react-router-dom'
import { CurrencyType, PriceType } from '../../MainTypes'

type ProductForCategoriesType = {
  name: string
  image: string
  id: string
  brand: string
  prices: Array<PriceType>
  selectedCurrency: CurrencyType
}

export class ProductForCategories extends Component<ProductForCategoriesType> {
  getPrice(): PriceType | undefined{
    return this.props.prices.find(
      (u: PriceType) => u.currency.symbol === this.props.selectedCurrency.symbol
    )
  }

  render() {
    const currentPrice = this.getPrice()
    return (
      <div className={s.productStyle}>
        <NavLink to={`/productPage/${this.props.id}`}>
          <div>
            <img src={this.props.image} className={s.img} alt='' />
          </div>
          <div>
            {this.props.brand} {this.props.name}
          </div>
          <div>
            {currentPrice && currentPrice.currency.symbol}
            {currentPrice && currentPrice.amount}
          </div>
        </NavLink>
      </div>
    )
  }
}