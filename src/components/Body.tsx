import React, { Component } from 'react'
import { Product } from './Product'
import { ApolloQueryResult, gql } from '@apollo/client'
import { client } from '../index'
import s from './body.module.scss'

 type MyState = {
  result: any | null/*ApolloQueryResult<any> | null*/
 }

export class Body extends Component<{ text: string }, MyState> {
  constructor(props: { text: string }) {
    super(props);

  }
  state: MyState = {
  result: null
}


  async componentDidMount() {
    this.setState({
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
  }


  render() {

    return <div>
      {this.props.text}
      <div className={s.products}>
        {this.state.result && this.state.result.data.category.products.map((u:any) =>
          <Product  name = {u.name} image = {u.gallery[0]}/>)}
      </div>
    </div>
  }
}
