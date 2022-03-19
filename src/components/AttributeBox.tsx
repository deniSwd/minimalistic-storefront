import React, { Component } from 'react'
import s from './attributeBox.module.scss'

export class AttributeBox extends Component<any, any> {


  render() {
    return     <div>
      <div>{this.props.attribute.name}:</div>
      <div className={s.attributesItem}>
        {this.props.attribute.items.map((item: any) => this.props.attribute.id === 'Color' ?
          <div className={s.itemElement} style={{backgroundColor:item.value}} > </div>
          : <div className={s.itemElement} >{item.value}</div>)}
      </div>
    </div>
  }
}