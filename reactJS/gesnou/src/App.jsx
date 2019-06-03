import React, { Component } from 'react';

import Button from './Button.jsx'

import './App.css'

class App extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      counter: 0
    } 
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick (n) {
    const newCounter = parseInt(n) + 1
    this.setState( {counter: newCounter} )
  }


  render() {
    return (
      <div>
        <Button clickButton={this.handleButtonClick} counter={this.state.counter} />     
      </div>
    )
  }
}

export default App