import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormNewTodo from './FormNewTodo/FormNewTodo';
import { LangsString } from '../../lang/Lang';

export default class NewTodo extends Component {

  render() {
    return (
      <div className="newtodo">
        <h3 className="new-title">{ LangsString.NewTodoTitle[this.props.currentLanguage] }</h3>
        <FormNewTodo languages={this.props.languages} 
              currentLanguage={this.props.currentLanguage} 
              handleFormSubmit={this.props.handleFormSubmit} />
      </div>
    )
  }
}

NewTodo.propTypes = {
  onNeWMessage: PropTypes.func,
  languages: PropTypes.array,
  currentLanguage: PropTypes.string,
  handleFormSubmit: PropTypes.func
}
