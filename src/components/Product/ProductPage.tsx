import React, { Component } from 'react'
import s from './productPage.module.scss'
import { connect, ConnectedProps } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import { productAPI } from '../../API/api'
import { AttributeSetType, AttributeType, PartialSelectedProductType, PriceType } from '../../MainTypes'
import { AttributeBox } from './AttributeBox'
import { actions } from '../../redux/cartReducer'
import Preloader from '../../utilities/Preloader'


type ProductPagePropsType = TProps & RouteComponentProps<{ id: string }>

export class ProductPage extends Component<ProductPagePropsType, PartialSelectedProductType> {
  constructor(props: ProductPagePropsType) {
    super(props)
    this.state = {}
  }


  async componentDidMount() {
    const result = await productAPI.getProduct(this.props.match.params.id)
    this.setState({ product: result })
  }


  getPrice(): PriceType | undefined {
    return this.state?.product?.prices?.find(
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

  addProduct = () => {
    this.props.addProductInCart(this.state)
  }

  render() {
    if (!this.state.product) {
      return <div>LOADING....</div>
    }
    console.log(this.props)
    const currentAttributes = this.state.product.attributes.map(
      (attribute: AttributeSetType, i: number) => (
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
              {this.state.product.gallery.map((mainPhoto: string, i: number) => (
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
                {currentPrice ? currentPrice.currency.symbol : <Preloader />} {currentPrice ? currentPrice.amount : <Preloader />}
              </div>
              <button className={s.button} onClick={this.addProduct}>
                Add to Cart
              </button>
              <div>{this.state.product.description ? ReactHtmlParser(this.state.product.description) : <Preloader />}</div>
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
const connector = connect(mapStateToProps, { ...actions })
const ProductPageContainer = connector(
  ProductPage
)
let WithRouterDataContainer = withRouter(ProductPageContainer)

export type TProps = ConnectedProps<typeof connector>

export default WithRouterDataContainer
