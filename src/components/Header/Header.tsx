import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import cartImg from '../../assets/cart.svg'
import setCurrencyOn from '../../assets/setCurrencyOn.png'
import setCurrencyOff from '../../assets/setCurrencyOff.png'
import logoImg from '../../assets/Logo.svg'
import s from './header.module.scss'
import { connect, ConnectedProps } from 'react-redux'
import { CurrencyType, PriceType } from '../../MainTypes'
import CartPageContainer from '../Cart/CartPage'
import { actions } from '../../redux/categoryReducer'
import { AppStateType } from '../../redux/redux-store'
import CartOverlayContainer from '../CartOverlay/CartOverlay'

type HeaderStateType = {
  showCurrency: boolean
  showCart: boolean
}

export class Header extends Component<HeaderPropsType, HeaderStateType> {
  constructor(props: HeaderPropsType) {
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
    this.props.setSelectedCurrency(currency)
  }
  getAndHideCurrency = (currency: CurrencyType) => {
    this.getCurrencyOnPage(currency)
    this.hideCurrencyOnPage()
  }

  render() {
    return (
      <div className={s.header}>
        <nav className={s.nav}>
          <div>
            <NavLink exact to="/" className={s.navItem} activeClassName={s.activeNavItem}>ALL</NavLink>
          </div>
          <div>
            <NavLink to="/clothes" className={s.navItem} activeClassName={s.activeNavItem}>CLOTHES</NavLink>
          </div>
          <div>
            <NavLink to="/tech" className={s.navItem} activeClassName={s.activeNavItem}>TECH</NavLink>
          </div>
        </nav>
        <div className={s.logo}>
          <img src={logoImg} />
        </div>
        <div className={s.actions}>
          <div className={s.currencySelector}
               onMouseEnter={this.showCurrencyOnPage}
               onMouseLeave={this.hideCurrencyOnPage}>
            <div>{this.props.selectedCurrency.symbol}</div>
            {!this.state.showCurrency ? (
              <div className={s.arrow}>
                <img src={setCurrencyOn} />
              </div>
            ) : (
              <div className={s.arrow}>
                <img src={setCurrencyOff} />
              </div>
            )}
            {this.state.showCurrency && (
              <div className={s.currencyList}>
                {this.props.products[0].prices.map((u: PriceType, i: number) => (
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
          <div className={s.cart}
               onMouseEnter={this.showCartOnPage}
               onMouseLeave={this.hideCartOnPage}>
            <img src={cartImg} />
            <div className={s.counterProducts}>
              {this.props.selectedProducts.length}
            </div>
            {this.state.showCart && (
              <div className={s.cartOverlay}>
                <CartOverlayContainer />
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

const connector = connect(mapStateToProps, { ...actions })
const HeaderPageContainer = connector(Header)

type HeaderPropsType = ConnectedProps<typeof connector>

export default HeaderPageContainer
