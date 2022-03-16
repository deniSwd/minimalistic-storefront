import React, { Component } from 'react'
import s from './product.module.scss'
import { NavLink } from 'react-router-dom'

export class Product extends Component<any, any> {

  render() {
    return <div className={s.productStyle}>
      <div>
        <img src={this.props.image} className={s.img} />
      </div>
      <NavLink to={`/productPage/${this.props.id}`} >{[this.props.brand,' ',this.props.name]}</NavLink>
      <div>{[this.props.prices[1].currency.symbol,this.props.prices[1].amount]}</div>
    </div>
  }
}