import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CategoryPageContainer from './Body'
import ProductPageContainer from './ProductPage'

export class Main extends Component {
  render() {
    return <div>
      <Route path='/all' render={() => <CategoryPageContainer />} />
      <Route path='/clothes' render={() => <CategoryPageContainer category="clothes" />} />
      <Route path='/tech' render={() => <CategoryPageContainer category="tech" />} />
      <Route path='/productPage/:id' render={() => <ProductPageContainer />} />
    </div>
  }
}