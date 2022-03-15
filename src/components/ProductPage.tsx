import React, { Component } from 'react'
import s from './productPage.module.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import { productAPI } from '../API/api'

export class ProductPage extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = { product: null }
  }

  async componentDidMount() {
    const result = await productAPI.getProduct(this.props.match.params.id)
    this.setState({ product: result })
  }


  render() {
    return <>{this.state.product && <div className={s.productPage}>
      <div>
        {this.state.product.gallery.map((a: any) => <div><img src={a} className={s.productPhotos} /></div>)}
      </div>
      <div>
        <img src={this.state.product.gallery[0]} className={s.productMainPhoto} />
      </div>
      <div className={s.info}>
        <div>{this.state.product.name}</div>
        <div>Size</div>
        <div>Price</div>
        <button>Add to Cart</button>
        <div>{ReactHtmlParser(this.state.product.description)}</div>
      </div>
    </div>}</>
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
