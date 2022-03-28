import React, { Component } from 'react'
import s from './productPage.module.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import { productAPI } from '../API/api'
import { AttributeType, PriceType } from '../MainTypes'
import { AttributeBox } from './AttributeBox'
import { getCurrentProduct } from '../redux/cartReducer'

export class ProductPage extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      product: null,
      productMainPhoto: '',
      currentItem: {},
      attributeId: '',
    }
  }

  async componentDidMount() {
    const result = await productAPI.getProduct(this.props.match.params.id)
    this.setState({ ...this.state, product: result })
  }


  getPrice(): PriceType {
    return this.state.product.prices.find(
      (u: any) => u.currency.symbol === this.props.selectedCurrency.symbol
    ) /*повторяется 3 раза оптимизировать*/
  }

  getProductMainPhoto(mainPhoto: any) {
    this.setState({ ...this.state, productMainPhoto: mainPhoto })
  }

  getProductItem = (item: AttributeType, attributeId: string) => {
    this.setState({
      ...this.state,
      currentItem: { ...this.state.currentItem, [attributeId]: item }
    })
  }

  getProduct = () => {
    this.props.getCurrentProduct(this.state)
  }

  render() {
    if (!this.state.product) {
      return <div>LOADING....</div>
    }

    const currentAttributes = this.state.product.attributes.map(
      (attribute: any, i: number) => (
        <AttributeBox
          attribute={attribute}
          getProductItem={this.getProductItem}
          currentItem={this.state.currentItem}
          key={i}
        />
      )
    )

    const currentPrice = this.getPrice()

    return (
      <>
        {this.state.product && (
          <div className={s.productPage}>
            <div>
              {this.state.product.gallery.map((mainPhoto: any, i: number) => (
                <div key={i}>
                  <img
                    src={mainPhoto}
                    className={s.productPhotos}
                    onClick={() => this.getProductMainPhoto(mainPhoto)}
                  />
                </div>
              ))}
            </div>
            <div>
              {this.state.productMainPhoto === '' ? (
                <img
                  src={this.state.product.gallery[0]}
                  className={s.productMainPhoto}
                />
              ) : (
                <img
                  src={this.state.productMainPhoto}
                  className={s.productMainPhoto}
                />
              )}
            </div>
            <div className={s.info}>
              <div>{this.state.product.brand}</div>
              <div>{this.state.product.name}</div>
              <div>{currentAttributes}</div>
              <div>PRICE:</div>
              <div>
                {currentPrice.currency.symbol} {currentPrice.amount}
              </div>
              <button className={s.button} onClick={this.getProduct}>
                Add to Cart
              </button>
              <div>{ReactHtmlParser(this.state.product.description)}</div>
            </div>
          </div>
        )}
      </>
    )
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
const ProductPageContainer = connect(mapStateToProps, { getCurrentProduct })(
  withRouterDataContainer
)
export default ProductPageContainer
