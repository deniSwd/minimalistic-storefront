import React, { Component } from 'react'
import productImg from '../assets/product.jpg'
import s from './product.module.scss'

export class Product extends Component<any, any> {
  render() {
    return <div className={s.productStyle}>
      <div>
        <img src={this.props.image} />
      </div>
      <div>{this.props.name}</div>
      <div>Price</div>
    </div>
  }
}