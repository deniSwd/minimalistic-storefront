import React, { Component } from 'react'
import HeaderPageContainer from './components/Header/Header'
import { RoutePage } from './components/RoutePage'
import s from './app.module.scss'
import { connect, ConnectedProps } from 'react-redux'
import { getAllProducts } from './redux/categoryReducer'
import { actions } from './redux/cartReducer'
import { CategoryPage } from './components/Categories/CategoryPage/CategoryPage'

export class App extends Component<ConnectPropsType> {

  async componentDidMount() {
    await this.props.getAllProducts()
  }

  render() {
    return (
      <div className={s.mainStyle}>
        <HeaderPageContainer />
        <RoutePage />
      </div>
    )
  }
}

const connector = connect(null, { getAllProducts })
const AppContainer = connector(App)

type ConnectPropsType = ConnectedProps<typeof connector>

export default AppContainer