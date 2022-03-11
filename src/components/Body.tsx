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
  componentDidMount() {
    this.props.getAllProducts()
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


    return <div>
      {this.props.name}
      <div className={s.products}>
        {this.props.products && this.props.products.map((u: any) =>
          <Product name={u.name} image={u.gallery[0]} />)}
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