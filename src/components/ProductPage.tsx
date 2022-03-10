import React, { Component } from 'react'
import productPhoto from './../assets/product.jpg'
import s from './productPage.module.scss'

export class ProductPage extends Component {
  render() {
    return <div className={s.productPage}>
      <div>
        product Photos
      </div>
      <div>
        <img src ={productPhoto}/>
      </div>
      <div className={s.info}>
        <div>Name</div>
        <div>Size</div>
        <div>Price</div>
        <button>Add to Cart</button>
        <div>Description</div>
      </div>
    </div>
  }
}