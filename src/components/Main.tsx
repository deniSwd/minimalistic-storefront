import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Body } from './Body'
import { ProductPage } from './ProductPage'

export class Main extends Component {
  render() {
    return <div>
      <Routes>
        <Route path='/all' element={<Body text="ALL" />} />
        <Route path='/clothes' element={<Body text="CLOTHES" />} />
        <Route path='/tech' element={<Body text="TECH" />} />
        <Route path='/productPage' element={<ProductPage />} />
      </Routes>
    </div>
  }
}