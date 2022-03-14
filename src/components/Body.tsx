import React, { Component } from 'react'
import { Product } from './Product'
import { ApolloQueryResult } from '@apollo/client'
import s from './body.module.scss'
import { connect } from 'react-redux'
import { getAllProducts } from '../redux/categoryPageReducer'

/*type MyState = {
  result: ApolloQueryResult<any> | null/!*ApolloQueryResult<any> | null*!/
 }*/

export class Body extends Component<any> {
  async componentDidMount() {
    await this.props.getAllProducts()
  }

  /*  constructor(props:string ) {
      super(props);
    }*/
  /*  state: MyState = {
    result: null
  }*/


  /*   componentDidMount() {
      this.setState({props.products
        ...this.state,
        result: await client
        .query({
          query: gql`
              query {
                  category {
                      name
                      products {
                          id
                          name
                          gallery
                          category
                      }
                  }
              }
          `
        })
      })
    }*/


  render() {

    const categoryName = this.props.category
    const renderCategory: any = this.props.products.filter((u:any) => u.category === categoryName)
    return <div>
      {categoryName ? categoryName : 'All'}
      <div className={s.products}>
        {this.props.products && categoryName ? renderCategory.map((u: any) =>
          <Product name={u.name} image={u.gallery[0]} id={u.id} />) :
          this.props.products.map((u: any) =>
            <Product name={u.name} image={u.gallery[0]} id={u.id}/>)}
      </div>
    </div>
  }
}


let mapStateToProps = (state: any) => {
  return {
    products: state.categoryPage.products,
    name: state.categoryPage.name
  }
}

const CategoryPageContainer = connect(mapStateToProps, { getAllProducts })(Body)
export default CategoryPageContainer