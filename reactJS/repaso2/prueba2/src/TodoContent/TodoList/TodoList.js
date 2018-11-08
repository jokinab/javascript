import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TodoList extends Component {
  render() {
    return (
      <div className="todolist">
        { this.props.children }
      </div>
    )
  }
}

TodoList.propTypes = {
  todolist: PropTypes.array
}
