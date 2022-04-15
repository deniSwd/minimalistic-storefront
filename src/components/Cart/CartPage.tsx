import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { actions } from '../../redux/cartReducer'
import { ProductForCart } from './ProductForCart'
import TotalPriceContainer from './TotalPrice'
import { AppStateType } from '../../redux/redux-store'
import { SelectedProductType } from '../../MainTypes'
import s from './cartPage.module.scss'
import v from './cartOverlay.module.scss'

type OutsideProps = {
  anotherStyle: boolean
}
export type CartPagePropsType = OutsideProps & ConnectPropsType

export class Cart extends Component<CartPagePropsType> {
  render() {
    let style = s
    this.props.anotherStyle ? style = v : style
    if (this.props.selectedProducts.length === 0) {
      return <div className={style.cartEmpty}>CART EMPTY...</div>
    }
    return (
      <div>
        <div className={style.cartTitle}>
          <div>MY CART,</div>
          <div className={style.numberItems}>{this.props.selectedProducts.length} items</div>
        </div>
        <div className={style.productsBlock}>
          {this.props.selectedProducts.map((productInCart: SelectedProductType, i: number) => (
            <ProductForCart
              key={i}
              productInCart={productInCart}
              currentAmountDown={this.props.setCurrentAmountDown}
              currentAmountUp={this.props.setCurrentAmountUp}
              selectedCurrency={this.props.selectedCurrency}
              anotherStyle ={this.props.anotherStyle}
              deleteProductInCart={this.props.deletedProductInCart}
            />
          ))}
        </div>
        <div><TotalPriceContainer  anotherStyle ={this.props.anotherStyle}/></div>
      </div>
    )
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    selectedProducts: state.cartPage.currentCart.selectedProducts,
    selectedCurrency: state.categoryPage.selectedCurrency
  }
}
const connector = connect(mapStateToProps, { ...actions })
const CartPageContainer = connector(Cart)

type ConnectPropsType = ConnectedProps<typeof connector>

export default CartPageContainer
