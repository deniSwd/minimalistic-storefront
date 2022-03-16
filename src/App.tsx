import React, { Component } from 'react'
import HeaderPageContainer from './components/Header'
import { Main } from './components/Main'
import s from './app.module.scss'

export class App extends Component<any, any> {

  render() {
    return <div className={s.mainStyle}>
      <HeaderPageContainer />
      <Main />
    </div>

  }
}