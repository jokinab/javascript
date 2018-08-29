import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LyfeCicleDemo from './LyfeCicleDemo/LyfeCicleDemo';

class App extends Component {
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

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={this.incrementSizeMessage}>Click to increase sizeMessage</button>
        <LyfeCicleDemo sizeMessage={this.state.sizeMessage} />
      </div>
    )
  }
}

export default App
