import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import cartImg from '../../assets/cart.png'
import setCurrencyOn from '../../assets/setCurrencyOn.png'
import setCurrencyOff from '../../assets/setCurrencyOff.png'
import logoImg from '../../assets/Logo.svg'
import s from './header.module.scss'
import { connect, ConnectedProps } from 'react-redux'
import { CurrencyType } from '../../MainTypes'
import CartPageContainer from '../Cart/CartPage'
import { actions } from '../../redux/categoryReducer'
import { AppStateType } from '../../redux/redux-store'

type HeaderStateType ={
  showCurrency: boolean
  showCart: boolean
}

export class Header extends Component<HeaderPropsType, HeaderStateType> {
  constructor(props: HeaderPropsType) {
    super(props)
    this.state = {
      showCurrency: false,
      showCart: false,
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
    this.props.setSelectedCurrency(currency)
  }
  getAndHideCurrency = (currency: CurrencyType) => {
    this.getCurrencyOnPage(currency)
    this.hideCurrencyOnPage()
  }

  render() {
    if (!this.props.products) {
      return <div>LOADING....</div>
    }
    return (
      <div className={s.header}>
        <nav className={s.nav}>
          <div>
            <NavLink to="/">All</NavLink>
          </div>
          <div>
            <NavLink to="/clothes">Clothes</NavLink>
          </div>
          <div>
            <NavLink to="/tech">Tech</NavLink>
          </div>
        </nav>
        <div>
          <img src={logoImg} />
        </div>
        <div className={s.cart}>
          <div
            onMouseEnter={this.showCurrencyOnPage}
            onMouseLeave={this.hideCurrencyOnPage}
          >
            <div>{this.props.selectedCurrency.symbol}</div>
            {!this.state.showCurrency ? (
              <div>
                <img src={setCurrencyOn} />
              </div>
            ) : (
              <div>
                <img src={setCurrencyOff} />
              </div>
            )}
            {this.state.showCurrency && (
              <div>
                {this.props.products[0].prices && this.props.products[0].prices.map((u: any, i: number) => (
                  <div
                    key={i}
                    onClick={() => this.getCurrencyOnPage(u.currency)}
                  >
                    {u.currency.symbol} {u.currency.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            onMouseEnter={this.showCartOnPage}
            onMouseLeave={this.hideCartOnPage}
          >
            <img src={cartImg} />
            <div className={s.counterProducts}>
              {this.props.selectedProducts.length}
            </div>
            {this.state.showCart && (
              <div className={s.cartOverlay}>
                <CartPageContainer />
                <div className={s.button}>
                  <NavLink to={'/cartPage'}>
                    <button>VIEW BAG</button>
                  </NavLink>
                  <button>CHECK OUT</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    products: state.categoryPage.products,
    selectedCurrency: state.categoryPage.selectedCurrency,
    selectedProducts: state.cartPage.currentCart.selectedProducts
  }
}

const connector = connect(mapStateToProps, {...actions})
const HeaderPageContainer = connector(Header)

export type HeaderPropsType = ConnectedProps<typeof connector>

export default HeaderPageContainer
