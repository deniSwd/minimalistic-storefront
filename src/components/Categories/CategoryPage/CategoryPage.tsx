import React, { Component } from 'react'
import { ProductForCategories } from '../ProductForCategories/ProductForCategories'
import s from './categoryPage.module.scss'
import closeButtonImg from '../../../assets/delete.png'
import { connect, ConnectedProps } from 'react-redux'
import { AppStateType } from '../../../redux/redux-store'
import { AttributeSetType, AttributeType, ProductType, SelectedProductType } from '../../../MainTypes'
import { actions, setLocalCart } from '../../../redux/cartReducer'
import { AttributeBox } from '../../Product/AttributeBox/AttributeBox'

type OutsideProps = {
  category: string
}
export type CategoryPagePropsType = OutsideProps & ConnectPropsType

export class CategoryPage extends Component<CategoryPagePropsType, SelectedProductType> {
  constructor(props: CategoryPagePropsType) {
    super(props)
    this.state = {
      product: null,
      productMainPhoto: '',
      currentItem: {},
      attributeId: '',
      amount: 0,
      attributesField: false
    }
  }


  addProduct = (productId: string) => {
    const productForCart = this.props.products.filter((v) => v.id === productId)
    const newState = {
      ...this.state,
      product: productForCart[0],
      attributesField: false
    }
    this.setState(newState)
    this.props.addProductInCart(newState)
    this.props.setLocalCart()
  }

  getProductItem = (item: AttributeType, attributeId: string) => {
    this.setState({
      ...this.state,
      currentItem: { ...this.state.currentItem, [attributeId]: item }
    })
  }
  setAttributesField = (productId: string) => {
    const productForCart = this.props.products.filter((v) => v.id === productId)
    this.setState({
      ...this.state,
      product: productForCart[0],
      attributesField: !this.state.attributesField,
      currentItem: {}
    })
  }
  closeAttributesField = () => {
    this.setState({
      ...this.state,
      attributesField: false
    })
  }

  render() {
    const product = this.state.product
    const categoryName = this.props.category
    const renderCategory: Array<ProductType> = this.props.products.filter(
      (u: ProductType) => u.category === categoryName)
    const currentAttributes = product?.attributes.map(
      (attribute: AttributeSetType, i: number) => (
        <AttributeBox
          anotherStyle={false}
          attribute={attribute}
          getProductItem={this.getProductItem}
          currentItem={this.state.currentItem}
          key={i}
        />
      )
    )
    return (
      <div className={s.categoryPage}>
        {this.state.attributesField &&
          <div className={s.messageBackground}>
            <div className={s.attributesField}>
              <div className={s.closeButton}>
                <img src={closeButtonImg} onClick={() => this.closeAttributesField()} alt='' />
              </div>
              <div className={s.titleForField}>
                You must selected attributes
              </div>
              <div>
                {currentAttributes}
              </div>
              <div>
                <button disabled={Object.keys(this.state.currentItem).length !== product?.attributes.length}
                        onClick={() => product && this.addProduct(product.id)}>
                  Add product
                </button>
              </div>
            </div>
          </div>}
        <div className={s.title}>
          {categoryName ? categoryName : 'all'}
        </div>
        <div className={s.products}>
          {this.props.products && categoryName
            ? renderCategory.map((u: ProductType, i: number) => (
              <ProductForCategories
                key={i}
                name={u.name}
                image={u.gallery[0]}
                id={u.id}
                brand={u.brand}
                inStock={u.inStock}
                prices={u.prices}
                attributes={u.attributes}
                addProduct={this.addProduct}
                selectedCurrency={this.props.selectedCurrency}
                setAttributesField={this.setAttributesField}
              />
            ))
            : this.props.products.map((u: ProductType, i: number) => (
              <ProductForCategories
                key={i}
                name={u.name}
                image={u.gallery[0]}
                id={u.id}
                brand={u.brand}
                inStock={u.inStock}
                prices={u.prices}
                attributes={u.attributes}
                addProduct={this.addProduct}
                selectedCurrency={this.props.selectedCurrency}
                setAttributesField={this.setAttributesField}
              />
            ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    products: state.categoryPage.products,
    name: state.categoryPage.name,
    selectedCurrency: state.categoryPage.selectedCurrency
  }
}
const connector = connect(mapStateToProps, { setLocalCart, addProductInCart: actions.addProductInCart })
const CategoryPageContainer = connector(CategoryPage)

type ConnectPropsType = ConnectedProps<typeof connector>

export default CategoryPageContainer
