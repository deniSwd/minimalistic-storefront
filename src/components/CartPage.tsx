import React, { Component } from 'react'
import { connect } from 'react-redux'
import s from './cartPage.module.scss'

export class Cart extends Component<any, any> {


  render() {
    console.log(this.props.currentCart)
    if (!this.props.currentCart) {
      return <div>CART EMPTY....</div>
    }
    return <div>
      <div>CART PAGE</div>
      <div className={s.selectedProduct}>
        <div>
          <div>{this.props.currentCart[0].product.brand}</div>
          <div>{this.props.currentCart[0].product.name}</div>
          <div>Price</div>
          <div>Attribute</div>
        </div>
        <div className={s.amountAndGallery}>
          <div>
            <div>+</div>
            <div>amount</div>
            <div>-</div>
          </div>
          <div>
            <img src={this.props.currentCart[0].product.gallery[0]} className={s.galleryInCart}/>
          </div>
        </div>
      </div>
    </div>
  }
}

let mapStateToProps = (state: any) => {
  return {
    currentCart: state.cartPage.currentCart
  }
}
const CartPageContainer = connect(mapStateToProps, null)(Cart)
export default CartPageContainer












