import { Component } from 'react'
import progress from '../assets/preloader.svg'
class Preloader extends Component {
  render() {
    return (
      <div>
        <img src={progress} />
      </div>
    )
  }
}

export default Preloader