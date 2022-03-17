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
        <div>
          <div>{this.props.selectedCurrency.symbol}</div>
          {!this.state.showCurrency ? <div onClick={this.showCurrencyOnPage}><img src={setCurrencyOn} /></div> :
            <div><img src={setCurrencyOff} /></div>}
          {this.state.showCurrency &&
          <div>
            {this.props.products[0].prices.map((u: any) =>
              <div
                onClick={() => this.getAndHideCurrency(u.currency)}>{[u.currency.symbol, ' ', u.currency.label]}</div>)}
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
    products: state.categoryPage.products,
    selectedCurrency: state.categoryPage.selectedCurrency
  }
}

const HeaderPageContainer = connect(mapStateToProps, { getCurrency })(Header)
export default HeaderPageContainer