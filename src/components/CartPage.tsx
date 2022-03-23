import React, { Component } from 'react'
import { connect } from 'react-redux'
import s from './cartPage.module.scss'
import { SliderForCart } from './SliderForCart'
import { currentAmountDown, currentAmountUp } from '../redux/cartReducer'

export class Cart extends Component<any, any> {

  amountDown = (amountOfProduct: number) => {
    this.props.currentAmountDown(amountOfProduct)
  }
  amountUp = (amountOfProduct: number) => {
    this.props.currentAmountUp(amountOfProduct)
  }


  render() {
    console.log(this.props.currentCart)
    if (this.props.currentCart.length === 0) {
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
          <div className={s.amount}>
            <button onClick={() => this.amountUp(this.props.currentAmount)}>+</button>
            <div>{this.props.currentAmount}</div>
            <button onClick={() => this.amountDown(this.props.currentAmount)}>-</button>
          </div>
          <div>
            <SliderForCart gallery={this.props.currentCart[0].product.gallery} />
          </div>
        </div>
      </div>
    </div>
  }
}

let mapStateToProps = (state: any) => {
  return {
    currentCart: state.cartPage.currentCart,
    currentAmount: state.cartPage.currentAmount
  }
}
const CartPageContainer = connect(mapStateToProps, { currentAmountDown, currentAmountUp })(Cart)
export default CartPageContainer












