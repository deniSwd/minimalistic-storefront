import React, { Component } from 'react'
import s from './productPage.module.scss'

type MessageAboutAttributesPropsType = {
  messageOff: () => void
}

class MessageAboutAttributes extends Component<MessageAboutAttributesPropsType> {
  render() {
    return (
      <div>
        <div className={s.messageBackground} />
        <div className={s.message}>
          <div>YOU MUST SELECTED ALL ATTRIBUTES!</div>
          <button onClick={this.props.messageOff}>OK</button>
        </div>
      </div>
    )
  }
}

export default MessageAboutAttributes