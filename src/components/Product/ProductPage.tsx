import React, { Component } from 'react'
import s from './productPage.module.scss'
import { connect, ConnectedProps } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import { productAPI } from '../../API/api'
import { AttributeSetType, AttributeType, PriceType, SelectedProductType } from '../../MainTypes'
import { AttributeBox } from './AttributeBox'
import { actions } from '../../redux/cartReducer'
import Preloader from '../../utilities/Preloader'
import { AppStateType } from '../../redux/redux-store'


type ProductPagePropsType = TProps & RouteComponentProps<{ id: string }>

export class ProductPage extends Component<ProductPagePropsType, SelectedProductType> {
  constructor(props: ProductPagePropsType) {
    super(props)
    this.state = {
      product: null,
      productMainPhoto: '',
      currentItem: {},
      attributeId: '',
      amount: 0
    }
  }


  async componentDidMount() {
    const result = await productAPI.getProduct(this.props.match.params.id)
    this.setState({ product: result })
  }


  getPrice(): PriceType | undefined {
    if (this.state.product != null && this.state.product.prices) {
      return this.state.product.prices.find(
        (u: PriceType) => u.currency.symbol === this.props.selectedCurrency.symbol
      )
    }

  }

  getProductMainPhoto(mainPhoto: string) {
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
      return <div><Preloader /></div>
    }
    const currentAttributes = this.state.product.attributes?.map(
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
            <div className={s.productPhotos}>
              {this.state.product.gallery.map((mainPhoto: string, i: number) => (
                <div key={i}>
                  <img
                    src={mainPhoto}
                    onClick={() => this.getProductMainPhoto(mainPhoto)}
                    className={s.productPhoto}
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
              <div className={s.brand}>
                {this.state.product.brand}
              </div>
              <div className={s.name}>
                {this.state.product.name}
              </div>
              <div>{currentAttributes}</div>
              <div className={s.price}>PRICE:</div>
              <div className={s.amount}>
                {currentPrice ? currentPrice.currency.symbol : <Preloader />} {
                currentPrice ? currentPrice.amount : <Preloader />}
              </div>
              <button className={s.button} onClick={this.addProduct}>
                ADD TO CART
              </button>
              <div className={s.description}>
                {this.state.product.description ?
                  ReactHtmlParser(this.state.product.description) : <Preloader />}
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    products: state.categoryPage.products,
    name: state.categoryPage.name,
    selectedCurrency: state.categoryPage.selectedCurrency
  }
}
const connector = connect(mapStateToProps, { ...actions })
const ProductPageContainer = connector(ProductPage)

let WithRouterDataContainer = withRouter(ProductPageContainer)

type TProps = ConnectedProps<typeof connector>

export default WithRouterDataContainer
