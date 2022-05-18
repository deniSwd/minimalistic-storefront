import React, { Component } from 'react'
import { ProductForCategories } from '../ProductForCategories/ProductForCategories'
import s from './categoryPage.module.scss'
import { connect, ConnectedProps } from 'react-redux'
import { AppStateType } from '../../../redux/redux-store'
import { ProductType, SelectedProductType } from '../../../MainTypes'
import { actions, setLocalCart } from '../../../redux/cartReducer'

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
      amount: 0
    }
  }


  addProduct = (productId: string) => {
    const productForCart = this.props.products.filter((v) => v.id === productId)
    const newState = { ...this.state, product: productForCart[0] }
    this.setState(newState)
    this.props.addProductInCart(newState)
    this.props.setLocalCart()
  }

  render() {
    const categoryName = this.props.category
    const renderCategory: Array<ProductType> = this.props.products.filter(
      (u: ProductType) => u.category === categoryName)
    return (
      <div className={s.categoryPage}>
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
