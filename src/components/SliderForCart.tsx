import React, { Component } from 'react'
import sliderButtonLeft from '../assets/sliderButtonLeft.png'
import sliderButtonRight from '../assets/sliderButtonRight.png'
import s from './slider.module.scss'

export class SliderForCart extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      currentImage: '',
    }
  }
  imageDown = () =>{

  }
  imageUp = () =>{

  }

  render() {

    return <div className={s.slider}>
      <img src={this.props.gallery[0]} className={s.galleryInCart}/>
    <div className={s.sliderButtons}>
      <img src={sliderButtonLeft} onClick={this.imageDown}/>
      <img src={sliderButtonRight} onClick={this.imageUp}/>
    </div>
    </div>
  }
}