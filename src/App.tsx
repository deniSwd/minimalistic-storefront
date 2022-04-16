import React, { Component } from 'react'
import HeaderPageContainer from './components/Header/Header'
import { RoutePage } from './components/RoutePage'
import s from './app.module.scss'
import { AppStateType } from './redux/redux-store'

export class App extends Component<AppStateType> {
  render() {
    return (
      <div className={s.mainStyle}>
        <HeaderPageContainer />
        <RoutePage />
      </div>
    )
  }
}
