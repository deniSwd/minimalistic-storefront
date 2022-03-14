import React, { Component } from 'react'
import s from './productPage.module.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ProductType } from '../MainTypes'
import ReactHtmlParser from 'react-html-parser'

export class ProductPage extends Component<any> {

  renderProduct(): any {
    return this.props.products.find((u: any) => u.id === this.props.match.params.id)
  }

  render() {
    const product = this.renderProduct()
    return <div className={s.productPage}>
      <div>
        {product.gallery.map((a: any) => <div><img src={a} className={s.productPhotos}/></div>)}
      </div>
      <div>
        <img src={product.gallery[0]} className={s.productMainPhoto}/>
      </div>
      <div className={s.info}>
        <div>{product.name}</div>
        <div>Size</div>
        <div>Price</div>
        <button>Add to Cart</button>
        <div>{ReactHtmlParser(product.description)}</div>
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
let withRouterDataContainer = withRouter(ProductPage)
const ProductPageContainer = connect(mapStateToProps, null)(withRouterDataContainer)
export default ProductPageContainer