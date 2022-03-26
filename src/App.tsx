import React, { Component } from 'react'
import HeaderPageContainer from './components/Header'
import { Main } from './components/Main'
import s from './app.module.scss'
import { AppStateType } from './redux/redux-store'

export class App extends Component<any, AppStateType> {
  render() {
    return (
      <div className={s.mainStyle}>
        <HeaderPageContainer />
        <Main />
      </div>
    )
  }
}
