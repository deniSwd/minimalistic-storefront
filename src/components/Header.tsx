import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import cartImg from '../assets/cart.png'
import logoImg from '../assets/Logo.svg'
import s from './header.module.scss'
import { connect } from 'react-redux'

export class Header extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      showCurrency: false,
      showCart: false
    }
  }

  showCurrencyOnPage = () => {
    this.setState({ showCurrency: true })
  }
  hideCurrencyOnPage = () => {
    this.setState({ showCurrency: false })
  }

  showCartOnPage = () => {
    this.setState({ showCart: true })
  }
  hideCartOnPage = () => {
    this.setState({ showCart: false })
  }


  render() {
    return <div className={s.header}>
      <nav className={s.nav}>
        <div>
          <NavLink to='/all'>All</NavLink>
        </div>
        <div>
          <NavLink to='/clothes'>Clothes</NavLink>
        </div>
        <div>
          <NavLink to='/tech'>Tech</NavLink>
        </div>
      </nav>
      <div>
        <img src={logoImg} />
      </div>
      <div className={s.cart}>
        <div>
          <div>$</div>
          {this.state.showCurrency ? <div onClick={this.hideCurrencyOnPage}>^</div>
            : <div onClick={this.showCurrencyOnPage}>^</div>}
          {this.state.showCurrency &&
          <div>
            {this.props.products[0]?.prices.map((u: any) => <div>{u.currency.label}</div>)}
          </div>}
        </div>
        <NavLink to={'/cartPage'}>
          <div onMouseEnter={this.showCartOnPage} onMouseLeave={this.hideCartOnPage}>
            <img src={cartImg} />
            {this.state.showCart && <div>MY CART</div>}
          </div>
        </NavLink>
      </div>
    </div>
  }
}

let mapStateToProps = (state: any) => {
  return {
    products: state.categoryPage.products
  }
}

const HeaderPageContainer = connect(mapStateToProps, null)(Header)
export default HeaderPageContainer