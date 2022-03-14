import React, { Component } from 'react'
import s from './product.module.scss'
import { NavLink } from 'react-router-dom'

export class Product extends Component<any, any> {

  render() {
    return <div className={s.productStyle}>
      <div>
        <img src={this.props.image} className={s.img} />
      </div>
      <NavLink to={`/productPage/${this.props.id}`} >{this.props.name}</NavLink>
      <div>Price</div>
    </div>
  }
}