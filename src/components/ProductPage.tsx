import React, { Component } from 'react'
import s from './productPage.module.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import { productAPI } from '../API/api'
import { PriceType } from '../MainTypes'
import { AttributeBox } from './AttributeBox'

export class ProductPage extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      product: null,
      productMainPhoto: ''
    }
  }

  async componentDidMount() {
    const result = await productAPI.getProduct(this.props.match.params.id)
    this.setState({ product: result })
  }

  getPrice(): PriceType {
    return this.state.product.prices.find((u: any) => u.currency.symbol === this.props.selectedCurrency.symbol)
  }

  getProductMainPhoto(mainPhoto: any) {
    this.setState({ productMainPhoto: mainPhoto })
  }


  render() {
    if (!this.state.product) {
      return <div>LOADING....</div>
    }

    const currentAttributes = this.state.product.attributes.map((attribute: any) =>
      <AttributeBox attribute={attribute} />)

    const currentPrice = this.getPrice()

    return <>
      {this.state.product &&
      <div className={s.productPage}>
        <div>
          {this.state.product.gallery.map((mainPhoto: any) => <div><img src={mainPhoto} className={s.productPhotos}
                                                                onClick={()=>this.getProductMainPhoto(mainPhoto)} /></div>)}
        </div>
        <div>
          {this.state.productMainPhoto ===''
            ? <img src={this.state.product.gallery[0]} className={s.productMainPhoto} />
          :<img src={this.state.productMainPhoto} className={s.productMainPhoto} />}
        </div>
        <div className={s.info}>
          <div>{this.state.product.brand}</div>
          <div>{this.state.product.name}</div>
          <div>{currentAttributes}</div>
          <div>PRICE:</div>
          <div>{currentPrice.currency.symbol} {currentPrice.amount}</div>
          <button>Add to Cart</button>
          <div>{ReactHtmlParser(this.state.product.description)}</div>
        </div>
      </div>}</>
  }
}

let mapStateToProps = (state: any) => {
  return {
    products: state.categoryPage.products,
    name: state.categoryPage.name,
    selectedCurrency: state.categoryPage.selectedCurrency
  }
}
let withRouterDataContainer = withRouter(ProductPage)
const ProductPageContainer = connect(mapStateToProps, null)(withRouterDataContainer)
export default ProductPageContainer
