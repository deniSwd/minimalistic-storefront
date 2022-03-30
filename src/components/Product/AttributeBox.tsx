import React, { Component } from 'react'
import s from './attributeBox.module.scss'
import { AttributeType } from '../../MainTypes'

export class AttributeBox extends Component<any, any> {
  render() {
    const attributeId: string = this.props.attribute.id
    const currentItem = this.props.currentItem
    const currentItemAttribute = this.props.currentItem[attributeId]
    console.log(currentItemAttribute)
    return (
      <div>
        <div>{this.props.attribute.name}:</div>
        <div className={s.attributesItem}>
          {this.props.attribute.items.map((item: AttributeType, i: number) =>
            attributeId === 'Color' ? (
              <div key={i} className={Object.keys(currentItem).length > 0 &&
                  currentItemAttribute === item ? s.currentItemElement : s.itemElement}
                style={{ backgroundColor: item.value }}
                onClick={() => this.props.getProductItem(item, attributeId)} />
            ) : (
              <div key={i} className={Object.keys(currentItem).length > 0 &&
              currentItemAttribute === item ? s.currentItemElement : s.itemElement}
                   onClick={() => this.props.getProductItem(item, attributeId)}>
                {item.value}
              </div>
            )
          )}
        </div>
      </div>
    )
  }
}
