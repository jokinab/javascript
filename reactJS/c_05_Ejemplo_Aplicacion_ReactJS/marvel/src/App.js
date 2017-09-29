import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  constructor (...args) {
    super(...args)
    this.state = {}
  }
  
  render() {
    return (
      <div className='container'>
        <img src={logo} className='App-logo' role='presentation' />
      </div>
    );
  }
}

export default App;
