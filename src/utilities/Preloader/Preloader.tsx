import { Component } from 'react'
import progress from '../../assets/preloader.svg'
import s from './preloader.module.scss'

class Preloader extends Component {
  render() {
    return (
      <div className={s.preloader}>
        <img src={progress} />
      </div>
    )
  }
}

export default Preloader