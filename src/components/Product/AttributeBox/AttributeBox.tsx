import React, { Component } from 'react'
import s from './attributeBox.module.scss'
import v from '../../Cart/ProductForCart/productForOverlay.module.scss'
import { AttributeSetType, AttributeType } from '../../../MainTypes'

type  AttributeBoxPropsType = {
  attribute: AttributeSetType
  getProductItem: (item: AttributeType, attributeId: string) => void
  currentItem: Record<string, AttributeType>
  anotherStyle: boolean
}

export class AttributeBox extends Component<AttributeBoxPropsType> {
  render() {
    const attributeId: string = this.props.attribute.id
    const currentItem = this.props.currentItem
    const currentItemAttribute = this.props.currentItem[attributeId]

    const style = this.props.anotherStyle ? v : s
    console.log(this.props.anotherStyle)
    return (
      <div className={style.currentAttributes}>
        <div className={style.attributeName}>
          {this.props.attribute.name}:
        </div>
        <div className={style.attributesItem}>
          {this.props.attribute.items.map((item, i) =>
            attributeId === 'Color' ? (
              <div key={i}
                   className={Object.keys(currentItem).length > 0 &&
                   currentItemAttribute === item ? style.currentColorItemElement : style.colorItemElement}
                   style={{ backgroundColor: item.value }}
                   onClick={() => this.props.getProductItem(item, attributeId)} />
            ) : (
              <div key={i}
                   className={Object.keys(currentItem).length > 0 &&
                   currentItemAttribute === item ? style.currentItemElement : style.itemElement}
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
