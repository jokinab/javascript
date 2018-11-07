import React, { Component } from 'react';
import logo from './../logo.svg';

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <img src={logo} className="App-logo" alt="logo" />
        { this.props.children }
      </div>
    )
  }
}
