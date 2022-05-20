import React, { Component } from 'react'
import { AttributeSetType, AttributeType, CurrencyType, CurrentItemType, SelectedProductType } from '../../../MainTypes'
import s from './productForCart.module.scss'
import { SliderForCart } from '../SliderForCart/SliderForCart'
import Preloader from '../../../utilities/Preloader/Preloader'
import v from './productForOverlay.module.scss'
import deleteImg from '../../../assets/delete.png'
import { getPrice } from '../../../utilities/getPrice'
import { AttributeBox } from '../../Product/AttributeBox/AttributeBox'
import { connect, ConnectedProps } from 'react-redux'
import { actions } from '../../../redux/cartReducer'
import { AppStateType } from '../../../redux/redux-store'

type OutsidePropsType = {
  productInCart: SelectedProductType
  currentAmountDown: (amountOfProduct: number,
                      productId: string,
                      currentItemProduct: CurrentItemType) => void
  currentAmountUp: (amountOfProduct: number,
                    productId: string,
                    currentItemProduct: CurrentItemType) => void
  selectedCurrency: CurrencyType
  anotherStyle: boolean
  deleteProductInCart: (deletedProduct: SelectedProductType) => void
  setLocalCart: () => void
}
export type ProductForCartPropsType = OutsidePropsType & ConnectPropsType

export class ProductForCart extends Component<ProductForCartPropsType> {
  amountDown = (amountOfProduct: number, productId: string, currentItemProduct: CurrentItemType) => {
    this.props.currentAmountDown(amountOfProduct, productId, currentItemProduct)
    this.props.setLocalCart()
  }
  amountUp = (amountOfProduct: number, productId: string, currentItemProduct: CurrentItemType) => {
    this.props.currentAmountUp(amountOfProduct, productId, currentItemProduct)
    this.props.setLocalCart()
  }

  deleteProduct = () => {
    this.props.deleteProductInCart(this.props.productInCart)
    this.props.setLocalCart()
  }
  getProductItem = (item: AttributeType, attributeId: string) => {
    if (!this.props.productInCart.product) return
    this.props.setAttributesFromCart(item, attributeId, this.props.productInCart.product.id)
  }

  render() {
    let style = s
    this.props.anotherStyle ? style = v : style
    const product = this.props.productInCart.product
    const currentPrice = product != null
      && getPrice(product.prices, this.props.selectedCurrency.symbol)
    if (!product) {
      return <Preloader />
    }
    const currentAttributes = product.attributes.map(
      (attribute: AttributeSetType, i: number) => (
        <AttributeBox
          anotherStyle={this.props.anotherStyle}
          attribute={attribute}
          getProductItem={this.getProductItem}
          currentItem={this.props.productInCart.currentItem}
          key={i}
        />
      )
    )
    return (
      <div className={style.selectedProduct}>
        <div>
          <div className={style.brand}>
            {product.brand}
          </div>
          <div className={style.name}>
            {product.name}
          </div>
          <div className={style.price}>
            {currentPrice && currentPrice.currency.symbol} {currentPrice && currentPrice.amount}
          </div>
          <div>
            {currentAttributes}
          </div>
        </div>
        <div className={style.amountAndGallery}>
          <div className={style.deleteButton} onClick={this.deleteProduct}>
            <img src={deleteImg} alt='' />
          </div>
          <div className={style.amount}>
            <button onClick={() => this.props.productInCart.product && this.amountUp(
              this.props.productInCart.amount,
              product.id,
              this.props.productInCart.currentItem)
            }
            >
              +
            </button>
            <div className={style.amountNumber}>{this.props.productInCart.amount}</div>
            <button onClick={() =>
              this.props.productInCart.product &&
              this.props.productInCart.amount > 1 ?
                this.amountDown(
                  this.props.productInCart.amount,
                  product.id,
                  this.props.productInCart.currentItem
                ) : this.deleteProduct()
            }
            >
              –
            </button>
          </div>
          <div>
            <SliderForCart gallery={product.gallery}
                           anotherStyle={this.props.anotherStyle} />
          </div>
        </div>
      </div>
    )
  }
}

const connector = connect((state: AppStateType) => ({ selectedProducts: state.cartPage.currentCart.selectedProducts }), { ...actions })
const ProductForCartContainer = connector(ProductForCart)

type ConnectPropsType = ConnectedProps<typeof connector>
export default ProductForCartContainer