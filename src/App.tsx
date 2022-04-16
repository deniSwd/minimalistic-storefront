import React, { Component } from 'react'
import HeaderPageContainer from './components/Header/Header'
import { RoutePage } from './components/RoutePage'
import s from './app.module.scss'

export class App extends Component {
  render() {
    return (
      <div className={s.mainStyle}>
        <HeaderPageContainer />
        <RoutePage />
      </div>
    )
  }
}
