import React, { Component } from 'react';

export default class NewTodo extends Component {
  render() {
    return (
      <div className="newtodo">
        { this.props.children }
      </div>
    )
  }
}
