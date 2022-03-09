import React, { Component } from 'react'
import { Header } from './components/Header'
import { Main } from './components/Main'
import s from './app.module.scss'

export class App extends Component {
  render() {
    return <div className={s.mainStyle}>
        <Header />
        <Main />
      </div>

  }
}