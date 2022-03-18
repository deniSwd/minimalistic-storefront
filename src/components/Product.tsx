import React, { Component } from 'react'
import s from './product.module.scss'
import { NavLink } from 'react-router-dom'
import { PriceType } from '../MainTypes'

export class Product extends Component<any, any> {

  getPrice(): PriceType {
    return this.props.prices.find((u:any) => u.currency.symbol === this.props.selectedCurrency.symbol)
  }

  render() {
    const currentPrice = this.getPrice()
    return <div className={s.productStyle}>
      <div>
        <img src={this.props.image} className={s.img} />
      </div>
      <NavLink to={`/productPage/${this.props.id}`} >{[this.props.brand,' ',this.props.name]}</NavLink>
      <div>{currentPrice?.currency?.symbol}{currentPrice?.amount}</div>
    </div>
  }
}