import React, { Component } from 'react';

export default class Body2 extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      name: 'Body2',
      lang: ''
    }
  }
  render() {
    return (
      <div className="body2">
      <h1> {this.state.name}</h1>
      </div>
    )
  }
}
