import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Body } from './Body'

export class Main extends Component {
  render() {
    return <div>
      <Routes>
        <Route path='/all' element={<Body text="ALL" />} />
        <Route path='/clothes' element={<Body text="CLOTHES" />} />
        <Route path='/tech' element={<Body text="TECH" />} />
      </Routes>
    </div>
  }
}