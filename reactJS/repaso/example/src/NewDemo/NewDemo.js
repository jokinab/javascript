import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from './Title';
import TodoList from './TodoList';
import FormList from './FormList/FormList';

export default class NewDemo extends Component {
  constructor (...args) {
    super(...args)
    this.state = {
      pushed: false,
      message: []
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addNewMessage = this.addNewMessage.bind(this);
  }

  addNewMessage () {
    let newMessageList = this.state.message

    this.setState({messageList: newMessageList})
  }

  handleFormSubmit (newMessagge) {
    const currentMenssages = this.state.message;
    currentMenssages.push(newMessagge);
    this.setState({message: currentMenssages});
  }

  render () {
    return (
      <div className="newdemo">
        <Title name='HelloDemo!' />
        <FormList onClick={this.addNewMessage} onFormSubmit={this.handleFormSubmit}/>
        <TodoList messagesList={this.state.message} />
      </div>
    )
  }
}
