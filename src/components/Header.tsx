import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import cartImg from '../assets/cart.png'
import logoImg from '../assets/Logo.svg'
import s from './header.module.scss'

export class Header extends Component {
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
      <div >
       <img src={logoImg}/>
      </div>
      <div>
        <img src={cartImg}/>
      </div>
    </div>
  }
}