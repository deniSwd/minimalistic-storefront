import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CartPageContainer from './Cart/CartPage'
import CategoryPageContainer from './Categories/CategoryPage'
import ProductPageContainer from './Product/ProductPage'

export class Main extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() => <CategoryPageContainer />} />
        <Route
          path="/clothes"
          render={() => <CategoryPageContainer category="clothes" />}
        />
        <Route
          path="/tech"
          render={() => <CategoryPageContainer category="tech" />}
        />
        <Route
          path="/productPage/:id"
          render={() => <ProductPageContainer />}
        />
        <Route path="/cartPage" render={() => <CartPageContainer />} />
      </div>
    )
  }
}
