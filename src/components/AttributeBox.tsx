import React, { Component } from 'react'
import s from './attributeBox.module.scss'
import { AttributeType } from '../MainTypes'

export class AttributeBox extends Component<any, any> {


  render() {
    return <div>
      <div>{this.props.attribute.name}:</div>
      <div className={s.attributesItem}>
        {this.props.attribute.items.map((item: AttributeType) => this.props.attribute.id === 'Color' ?
          <div className={this.props.currentItem != null && this.props.currentItem.id === item.id ? s.currentItemElement : s.itemElement}
               style={{ backgroundColor: item.value }} onClick={() => this.props.getProductItem(item,this.props.attribute.id)}> </div>
          : <div className={this.props.currentItem != null && this.props.currentItem.id === item.id ? s.currentItemElement : s.itemElement}
            onClick={() => this.props.getProductItem(item,this.props.attribute.id)}>{item.value}</div>)}
      </div>
    </div>
  }
}