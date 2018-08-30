import React, { Component } from 'react'
import LyfeCicleDemoChild from './LyfeCicleDemoChild'

export default class LyfeCicleDemo extends Component {  

  constructor (...args) {
    super(...args)

    this.state = {
      sizeMessage: 0
    }
    this.incrementSizeMessage = this.incrementSizeMessage.bind(this)
  }

  incrementSizeMessage () {
    let newSizeMessage = this.state.sizeMessage + 1
    this.setState({sizeMessage: newSizeMessage})
  }

  changeState () {
    this.setState({mensaje: 'Mensaje Actualizado!'})
  }

  render () {
    console.log('<LifeCycleDemo> render')
    return (
      <div className="lyfecicledemo">
        <LyfeCicleDemoChild sizeMessage={this.state.sizeMessage} />
        <button onClick={this.incrementSizeMessage}>Click to increase sizeMessage</button>
      </div>
    )
  }
}
