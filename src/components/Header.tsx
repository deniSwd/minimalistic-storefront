import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import cartImg from '../assets/cart.png'
import setCurrencyOn from '../assets/setCurrencyOn.png'
import setCurrencyOff from '../assets/setCurrencyOff.png'
import logoImg from '../assets/Logo.svg'
import s from './header.module.scss'
import { connect } from 'react-redux'
import { CurrencyType } from '../MainTypes'
import { getCurrency } from '../redux/categoryPageReducer'
import CartPageContainer from './CartPage'

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
  getCurrencyOnPage = (currency: CurrencyType) => {
    this.props.getCurrency(currency)
  }
  getAndHideCurrency = (currency: CurrencyType) => {
    this.getCurrencyOnPage(currency)
    this.hideCurrencyOnPage()
  }

  render() {
    if (!this.props.products) {
      return <div>LOADING....</div>
    }
    return <div className={s.header}>
      <nav className={s.nav}>
        <div>
          <NavLink to='/'>All</NavLink>
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
        <div onMouseEnter={this.showCurrencyOnPage} onMouseLeave={this.hideCurrencyOnPage}>
          <div>{this.props.selectedCurrency.symbol}</div>
          {!this.state.showCurrency ? <div><img src={setCurrencyOn} /></div> :
            <div><img src={setCurrencyOff} /></div>}
          {this.state.showCurrency &&
          <div>
            {this.props.products[0].prices.map((u: any) =>
              <div
                   onClick={() => this.getCurrencyOnPage(u.currency)}>{u.currency.symbol} {u.currency.label}</div>)}
          </div>}
        </div>
        <NavLink to={'/cartPage'}>
          <div onMouseEnter={this.showCartOnPage} onMouseLeave={this.hideCartOnPage}>
            <img src={cartImg} />
            {this.state.showCart &&
            <div className={s.cartOverlay}>
              <CartPageContainer />
              <div className={s.totalPrice}>
                <div>Total:</div>
                <div> 200$</div>
              </div>
              <div className={s.button}>
                <button>VIEW BAG</button>
                <button>CHECK OUT</button>
              </div>
            </div>}
          </div>
        </NavLink>
      </div>
    </div>
  }
}

let mapStateToProps = (state: any) => {
  return {
    products: state.categoryPage.products,
    selectedCurrency: state.categoryPage.selectedCurrency
  }
}

const HeaderPageContainer = connect(mapStateToProps, { getCurrency })(Header)
export default HeaderPageContainer