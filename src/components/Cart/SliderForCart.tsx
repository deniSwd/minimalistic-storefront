import React, { Component } from 'react'
import sliderButtonLeft from '../../assets/sliderButtonLeft.png'
import sliderButtonRight from '../../assets/sliderButtonRight.png'
import { GalleryType } from '../../MainTypes'
import s from './slider.module.scss'
import v from './imageForOverlay.module.scss'

type SliderForCartStateType = {
  currentImageIndex: number
}
type OutsideProps = {
  gallery: GalleryType
  anotherStyle: boolean
}

export class SliderForCart extends Component<OutsideProps, SliderForCartStateType> {
  constructor(props: OutsideProps) {
    super(props)
    this.state = {
      currentImageIndex: 0
    }
  }

  imageDown = (imageIndex: number) => {
    this.setState(
      this.state.currentImageIndex > 0
        ? { currentImageIndex: imageIndex - 1 }
        : { currentImageIndex: imageIndex }
    )
  }
  imageUp = (imageIndex: number) => {
    this.setState(
      this.state.currentImageIndex < this.props.gallery.length - 1
        ? { currentImageIndex: imageIndex + 1 }
        : { currentImageIndex: imageIndex }
    )
  }

  render() {
    let style = this.props.anotherStyle ? v : s
    const imageIndex = this.state.currentImageIndex
    return (
      <div className={style.slider}>
        { !this.props.anotherStyle ? <div>
          <img src={this.props.gallery[imageIndex]} className={style.galleryInCart} alt=''/>
          <div className={style.sliderButtons}>
            <img
              src={sliderButtonLeft}
              onClick={() => this.imageDown(imageIndex)} alt=''/>
            <img
              src={sliderButtonRight}
              onClick={() => this.imageUp(imageIndex)} alt=''/>
          </div>
        </div> : <img src={this.props.gallery[0]} className={style.imageInCart} alt=''/>}
      </div>
    )
  }
}
