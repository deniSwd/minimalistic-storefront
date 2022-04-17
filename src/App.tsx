import React, { Component } from 'react'
import HeaderPageContainer from './components/Header/Header'
import { RoutePage } from './components/RoutePage'
import s from './app.module.scss'
import { connect, ConnectedProps } from 'react-redux'
import { getAllProducts } from './redux/categoryReducer'
import { getLocalCart } from './redux/cartReducer'

export class App extends Component<ConnectPropsType> {

  async componentDidMount() {
    await this.props.getAllProducts()
    this.props.getLocalCart()
  }

  render() {
    return (
      <div className={s.mainStyle}>
        <div className={s.headerWrapper}>
          <HeaderPageContainer />
        </div>
        <RoutePage />
      </div>
    )
  }
}

const connector = connect(null, { getAllProducts, getLocalCart })
const AppContainer = connector(App)

type ConnectPropsType = ConnectedProps<typeof connector>

export default AppContainer