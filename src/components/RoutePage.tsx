import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CartPageContainer from './Cart/CartPage/CartPage'
import CategoryPageContainer from './Categories/CategoryPage/CategoryPage'
import WithRouterProductPageContainer from './Product/ProductPage/ProductPage'

export class RoutePage extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() => <CategoryPageContainer category=""/>} />
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
          render={() => <WithRouterProductPageContainer />}
        />
        <Route path="/cartPage" render={() => <CartPageContainer anotherStyle ={false} />} />
      </div>
    )
  }
}
