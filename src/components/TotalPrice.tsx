import React, { Component } from 'react'
import { connect } from 'react-redux'

export class TotalPrice extends Component<any, any> {

   getTotalPrice = (): number => {
     const currentProductPrice = this.props.selectedProducts.map((product: any) =>
       product.product.prices.find((v: any) => v.currency.label === this.props.selectedCurrency.label).amount * product.amount)
     return  currentProductPrice.reduce((a:number, b:number) => a + b)
   }

  render() {
    return (
      <div>
        Total Price: {this.props.selectedCurrency.symbol} {this.getTotalPrice().toFixed(2)}
      </div>
    )
  }
}

let mapStateToProps = (state: any) => {
  return {
    selectedProducts: state.cartPage.currentCart.selectedProducts,
    selectedCurrency: state.categoryPage.selectedCurrency
  }
}
const TotalPriceContainer = connect(mapStateToProps, null)(TotalPrice)
export default TotalPriceContainer