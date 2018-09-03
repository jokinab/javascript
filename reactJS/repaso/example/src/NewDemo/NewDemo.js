import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from './Title';
import Button from './Button';
import FormList from './FormList/FormList';

export default class NewDemo extends Component {
  constructor (...args) {
    super(...args)
    this.state = {
      pushed: false,
      message: []
    }
    this.onCLickButton = this.onCLickButton.bind(this)
  }

  onCLickButton (e) {
    console.log(e.target)
    this.setState({pushed: !this.state.pushed})
  }

  addNewMessage () {
    let newMessageList = this.state.message

    this.setState({messageList: newMessageList})
  }
  render () {
    return (
      <div className="newdemo">
        <Title name='HelloDemo!' />
        <Button onClick={this.onCLickButton} />
        <FormList onClick={this.addNewMessage} />
      </div>
    )
  }
}