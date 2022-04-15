import React, { Component } from 'react'
import s from './attributeBox.module.scss'
import { AttributeSetType, AttributeType } from '../../MainTypes'

type  AttributeBoxPropsType = {
  attribute: AttributeSetType
  getProductItem: (item: AttributeType, attributeId: string) => void
  currentItem: Record<string, AttributeType>
}

export class AttributeBox extends Component<AttributeBoxPropsType> {
  render() {

    const attributeId: string = this.props.attribute.id
    const currentItem = this.props.currentItem
    const currentItemAttribute = this.props.currentItem[attributeId]
    console.log(currentItemAttribute)
    return (
      <div>
        <div className={s.attributeName}>
          {this.props.attribute.name}:
        </div>
        <div className={s.attributesItem}>
          {this.props.attribute.items.map((item, i) =>
            attributeId === 'Color' ? (
              <div key={i}
                   className={Object.keys(currentItem).length > 0 &&
                   currentItemAttribute === item ? s.currentItemElement : s.itemElement}
                   style={{ backgroundColor: item.value }}
                   onClick={() => this.props.getProductItem(item, attributeId)} />
            ) : (
              <div key={i}
                   className={Object.keys(currentItem).length > 0 &&
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
