import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import s from './CartPage/cartPage.module.scss'
import v from './CartPage/cartOverlay.module.scss'

type OutsideProps = {
  anotherStyle: boolean
}
export type TotalPricePropsType = OutsideProps & ConnectPropsType

export class TotalPrice extends Component<TotalPricePropsType> {

  getTotalPrice = (): number => {
    const currentProductPrice = this.props.selectedProducts.map((product) => {
      if (!product.product) return 0
      return (
        product.product.prices.find(
          v => v.currency.label === this.props.selectedCurrency.label)?.amount ?? 0) * product.amount
    })
    return currentProductPrice.reduce((a: number, b: number) => a + b)
  }

  render() {
    let style = s
    this.props.anotherStyle ? style = v : style
    return (
      <div className={style.totalPrice}>
        <div className={style.total}>
          <div>
            Total Price:
          </div>
          <div className={style.price}>
            {this.props.selectedCurrency.symbol} {this.props.selectedProducts && this.getTotalPrice().toFixed(2)}
          </div>
        </div>
        {!this.props.anotherStyle &&
        <div>
          <button className={s.greenButton} onClick={() => alert('Happy End')}>
            CHECK OUT
          </button>
        </div>}
      </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    selectedProducts: state.cartPage.currentCart.selectedProducts,
    selectedCurrency: state.categoryPage.selectedCurrency
  }
}

const connector = connect(mapStateToProps)
const TotalPriceContainer = connector(TotalPrice)

type ConnectPropsType = ConnectedProps<typeof connector>


export default TotalPriceContainer