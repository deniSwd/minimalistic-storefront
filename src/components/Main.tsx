import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import CategoryPageContainer from './Body'
import { ProductPage } from './ProductPage'

export class Main extends Component {
  render() {
    return <div>
      <Routes>
        <Route path='/all' element={<CategoryPageContainer />} />
        <Route path='/clothes' element={<CategoryPageContainer category = "clothes"/>} />
        <Route path='/tech' element={<CategoryPageContainer category = "tech"/>} />
        <Route path='/productPage' element={<ProductPage />} />
      </Routes>
    </div>
  }
}