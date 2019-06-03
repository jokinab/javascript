import React, { Component } from 'react';

export default class Button extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      counter: 0
    } 
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (evt) {
    //this.setState( {counter: evt.target.value+1} )
    this.props.clickButton(evt.target.value)
  }

  render() {
    return (
      <div>
        <p>You clicked {this.props.counter} times</p>
        <button onClick={this.handleClick} value={this.props.counter}>Click me</button>
      </div>
    )
  } 

}

