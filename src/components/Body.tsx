import React, { Component } from 'react'
import { Product } from './Product'

export class Body extends Component<{ text: string }> {
  render() {
    return <div>
      {this.props.text}
      <Product />
    </div>
  }
}