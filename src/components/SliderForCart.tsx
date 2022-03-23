import React, { Component } from 'react'
import sliderButtonLeft from '../assets/sliderButtonLeft.png'
import sliderButtonRight from '../assets/sliderButtonRight.png'
import s from './slider.module.scss'

export class SliderForCart extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      currentImageIndex: 0
    }
  }

  imageDown = (imageIndex: number) => {
    this.setState(this.state.currentImageIndex > 0 ?
      { currentImageIndex: imageIndex - 1 }:
      {currentImageIndex: imageIndex})
  }
  imageUp = (imageIndex: number) => {
    this.setState(this.state.currentImageIndex < this.props.gallery.length - 1 ?
      { currentImageIndex: imageIndex + 1 }:
      {currentImageIndex: imageIndex})
  }

  render() {
    const imageIndex = this.state.currentImageIndex
    return <div className={s.slider}>
      <img src={this.props.gallery[imageIndex]} className={s.galleryInCart} />
      <div className={s.sliderButtons}>
        <img src={sliderButtonLeft}
             onClick={() => this.imageDown(imageIndex)} /> {/*передать сюда индекс текущей фото*/}
        <img src={sliderButtonRight} onClick={() => this.imageUp(imageIndex)} />
      </div>
    </div>
  }
}