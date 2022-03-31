import React, { Component } from 'react'
import { ProductForCategories } from './ProductForCategories'
import s from './categoryPage.module.scss'
import { connect, ConnectedProps } from 'react-redux'
import { getAllProducts } from '../../redux/categoryReducer'
import { AppStateType } from '../../redux/redux-store'
import { ProductType } from '../../MainTypes'

type OutsideProps = {
  category: string
}
export type CategoryPagePropsType = OutsideProps & ConnectPropsType

export class CategoryPage extends Component<CategoryPagePropsType> {
  async componentDidMount() {
    await this.props.getAllProducts()
  }

  render() {
    const categoryName = this.props.category
    const renderCategory: Array<ProductType> = this.props.products.filter(
      (u: ProductType) => u.category === categoryName)
    return (
      <div>
        {categoryName ? categoryName : 'All'}
        <div className={s.products}>
          {this.props.products && categoryName
            ? renderCategory.map((u: ProductType, i: number) => (
                <ProductForCategories
                  key={i}
                  name={u.name}
                  image={u.gallery[0]}
                  id={u.id}
                  brand={u.brand}
                  prices={u.prices}
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
                  prices={u.prices}
                  selectedCurrency={this.props.selectedCurrency}
                />
              ))}
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    products: state.categoryPage.products,
    name: state.categoryPage.name,
    selectedCurrency: state.categoryPage.selectedCurrency,
  }
}
const connector = connect(mapStateToProps, { getAllProducts })
const CategoryPageContainer = connector(CategoryPage)

type ConnectPropsType = ConnectedProps<typeof connector>

export default CategoryPageContainer
