import React, { Component } from 'react'
import { Product } from './Product'
import { ApolloQueryResult } from '@apollo/client'
import s from './categoryPage.module.scss'
import { connect } from 'react-redux'
import { getAllProducts } from '../redux/categoryPageReducer'

/*type MyState = {
  result: ApolloQueryResult<any> | null/!*ApolloQueryResult<any> | null*!/
 }*/

export class CategoryPage extends Component<any> {
  async componentDidMount() {
    await this.props.getAllProducts()
  }

  render() {
    const categoryName = this.props.category
    const renderCategory: any = this.props.products.filter((u: any) => u.category === categoryName)
    return <div>
      {categoryName ? categoryName : 'All'}
      <div className={s.products}>
        {this.props.products && categoryName ? renderCategory.map((u: any) =>
            <Product name={u.name} image={u.gallery[0]} id={u.id}
                     brand={u.brand} prices={u.prices} selectedCurrency = {this.props.selectedCurrency} />) :
          this.props.products.map((u: any) =>
            <Product name={u.name} image={u.gallery[0]} id={u.id}
                     brand={u.brand} prices={u.prices} selectedCurrency = {this.props.selectedCurrency}/>)}
      </div>
    </div>
  }
}


let mapStateToProps = (state: any) => {
  return {
    products: state.categoryPage.products,
    name: state.categoryPage.name,
    selectedCurrency: state.categoryPage.selectedCurrency
  }
}

const CategoryPageContainer = connect(mapStateToProps, { getAllProducts })(CategoryPage)
export default CategoryPageContainer