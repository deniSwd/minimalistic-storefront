import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'

export class TotalPrice extends Component<TotalPriceProps> {

  getTotalPrice = (): number => {
    const currentProductPrice = this.props.selectedProducts.map((product) => {
      if(!product.product) return 0
      return (product.product.prices.find(v => v.currency.label === this.props.selectedCurrency.label)?.amount ?? 0) * product.amount
    })
    return currentProductPrice.reduce((a: number, b: number) => a + b)
  }

  render() {
    return (
      <div>
        Total Price: {this.props.selectedCurrency.symbol} { this.props.selectedProducts && this.getTotalPrice().toFixed(2)}
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

const connector = connect(mapStateToProps)
const TotalPriceContainer = connector(TotalPrice)

type TotalPriceProps = ConnectedProps<typeof connector>


export default TotalPriceContainer