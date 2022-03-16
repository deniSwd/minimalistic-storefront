import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import cartImg from '../assets/cart.png'
import logoImg from '../assets/Logo.svg'
import s from './header.module.scss'
import { connect } from 'react-redux'
import { getHideCurrency, getShowCurrency } from '../redux/categoryPageReducer'

export class Header extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = { showCurrency: false }
  }

  showCurrencyOnPage = () => {
    this.setState({ showCurrency: true })
  }
  hideCurrencyOnPage = () => {
    this.setState({ showCurrency: false })
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
          <span>$</span>
          {this.state.showCurrency ? <span onClick={this.hideCurrencyOnPage}>^</span>
            : <span onClick={this.showCurrencyOnPage}>^</span>}
          {this.state.showCurrency &&
          <div>
            <div>GBP</div>
            <div>AUD</div>
            <div>JPY</div>
            <div>RUB</div>
          </div>}
        </div>
        <div>
          <img src={cartImg} />
        </div>

      </div>
    </div>
  }
}

let mapStateToProps = (state: any) => {
  return {}
}

const HeaderPageContainer = connect(mapStateToProps, null)(Header)
export default HeaderPageContainer