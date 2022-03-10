import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import CategoryPageContainer from './Body'
import { ProductPage } from './ProductPage'

export class Main extends Component {
  render() {
    return <div>
      <Routes>
        <Route path='/all' element={<CategoryPageContainer />} />
        <Route path='/clothes' element={<CategoryPageContainer />} />
        <Route path='/tech' element={<CategoryPageContainer />} />
        <Route path='/productPage' element={<ProductPage />} />
      </Routes>
    </div>
  }
}