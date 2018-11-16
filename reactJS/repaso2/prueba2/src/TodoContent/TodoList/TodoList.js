import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ViewList from './ViewList/ViewList';

const DisplayListEmpty = (props) => {
  return (
    <h3>
      <strong>{ props.messageEmpty[props.currentLanguage]}</strong>
    </h3>
  )
}

export default class TodoList extends Component {
  render() {
    return (
      <div className="todolist">
        { this.props.todoList.length === 0 && <DisplayListEmpty messageEmpty={this.props.messageEmpty} currentLanguage={this.props.currentLanguage} /> }
        { this.props.todoList.length > 0 && <ViewList todoListItems={this.props.todoList} currentLanguage={this.props.currentLanguage} /> }
      </div>
    )
  }
}

TodoList.propTypes = {
  todoList: PropTypes.array,
  messageEmpty: PropTypes.object,
  currentLanguage: PropTypes.string
}
