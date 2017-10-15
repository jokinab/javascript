import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
//import App from './containers/App'
//import counterApp from './reducers/counterApp'
//import { logger } from './middlewares/logger'

import Counter from './components/Counter'
import InputList from './components/InputList';

export default class ReduxExample extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      counter: 0
    };
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd () {
    this.setState({ 
      counter: this.state.counter + 1 
    });
  }


  render () {
    return (
      <div>
        <Counter onAdd={this.handleAdd} />
        <InputList counter={this.state.counter} />
      </div>
    )
  }  
}