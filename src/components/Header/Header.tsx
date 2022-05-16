import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import cartImg from '../../assets/cart.svg'
import setCurrencyOn from '../../assets/setCurrencyOn.png'
import setCurrencyOff from '../../assets/setCurrencyOff.png'
import logoImg from '../../assets/Logo.svg'
import s from './header.module.scss'
import { connect, ConnectedProps } from 'react-redux'
import { CurrencyType, PriceType, SelectedProductType } from '../../MainTypes'
import CartPageContainer from '../Cart/CartPage/CartPage'
import { actions } from '../../redux/categoryReducer'
import { AppStateType } from '../../redux/redux-store'

type HeaderStateType = {
  showCurrency: boolean
  showCart: boolean
  counterProductsValue: number
}

export class Header extends Component<HeaderPropsType, HeaderStateType> {
  constructor(props: HeaderPropsType) {
    super(props)
    this.state = {
      showCurrency: false,
      showCart: false,
      counterProductsValue: 0
    }
  }

  componentDidUpdate(prevProps: Readonly<HeaderPropsType>, prevState: Readonly<HeaderStateType>) {
    if(prevState.counterProductsValue === this.countProducts(this.props.selectedProducts)) return
    this.setCountProducts(this.props.selectedProducts)
  }

  showCurrencyOnPage = () => {
    this.setState({ showCurrency: true })
  }
  hideCurrencyOnPage = () => {
    this.setState({ showCurrency: false })
  }

  showAndHideCartOnPage = () => {
    this.setState({ showCart: !this.state.showCart })
  }

  getCurrencyOnPage = (currency: CurrencyType) => {
    this.props.setSelectedCurrency(currency)
  }
  getAndHideCurrency = (currency: CurrencyType) => {
    this.getCurrencyOnPage(currency)
    this.hideCurrencyOnPage()
  }
  forCheckOutButton = () => {
    this.showAndHideCartOnPage()
    alert('Happy End')
  }

  countProducts(selectedProducts: Array<SelectedProductType>) {
    let counterProductsValue = 0
    for (let i = 0; i <= selectedProducts.length; i++) {
      counterProductsValue += selectedProducts[i]?.amount ?? 0
    }
    return counterProductsValue
  }

  setCountProducts = (selectedProducts: Array<SelectedProductType>) => {
    this.setState({ counterProductsValue: this.countProducts(selectedProducts) })
  }

  render() {
    return (
      <div className={s.header}>
        <nav className={s.nav}>
          <div>
            <NavLink exact to="/" className={s.navItem}
                     activeClassName={s.activeNavItem}>ALL</NavLink>
          </div>
          <div>
            <NavLink to="/clothes" className={s.navItem}
                     activeClassName={s.activeNavItem}>CLOTHES</NavLink>
          </div>
          <div>
            <NavLink to="/tech" className={s.navItem}
                     activeClassName={s.activeNavItem}>TECH</NavLink>
          </div>
        </nav>
        <div className={s.logo}>
          <img src={logoImg} alt='' />
        </div>
        <div className={s.actions}>
          <div className={s.currencySelector}
               onMouseEnter={this.showCurrencyOnPage}
               onMouseLeave={this.hideCurrencyOnPage}>
            <div>{this.props.selectedCurrency.symbol}</div>
            {!this.state.showCurrency ? (
              <div className={s.arrow}>
                <img src={setCurrencyOn} alt='' />
              </div>
            ) : (
              <div className={s.arrow}>
                <img src={setCurrencyOff} alt='' />
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
          <div className={s.cart}>
            <div className={s.cartButton}
                 onClick={this.showAndHideCartOnPage}>
              <img src={cartImg} alt='' />
              {this.props.selectedProducts.length > 0 &&
              <div className={s.counterProducts}>
                {this.state.counterProductsValue}
              </div>}
            </div>
            {this.state.showCart && (
              <div>
                <div className={s.overlayBackground} onClick={this.showAndHideCartOnPage} />
                <div className={s.cartOverlay}>
                  <CartPageContainer anotherStyle={true} />
                  <div className={s.buttons}>
                    <NavLink to={'/cartPage'}>
                      <button className={s.whiteButton}
                              onClick={this.showAndHideCartOnPage}>
                        VIEW BAG
                      </button>
                    </NavLink>
                    <button className={s.greenButton} onClick={this.forCheckOutButton}>
                      CHECK OUT
                    </button>
                  </div>
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

const connector = connect(mapStateToProps, { ...actions })
const HeaderPageContainer = connector(Header)

type HeaderPropsType = ConnectedProps<typeof connector>

export default HeaderPageContainer
