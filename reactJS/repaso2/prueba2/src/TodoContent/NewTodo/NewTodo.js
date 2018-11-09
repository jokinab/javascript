import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormNewTodo from './FormNewTodo/FormNewTodo';

export default class NewTodo extends Component {

  constructor (...args) {
    super (...args);

    this.state = {
      currentLanguage: this.props.currentLanguage
    }
  }  

  render() {
    return (
      <div className="newtodo">
        <h3 className="new-title">{ this.props.title }</h3>
        <FormNewTodo languages={this.props.languages} 
              currentLanguage={this.state.currentLanguage} 
              handleFormSubmit={this.props.handleFormSubmit} />
      </div>
    )
  }
}

NewTodo.propTypes = {
  onNeWMessage: PropTypes.func,
  title: PropTypes.string,
  languages: PropTypes.array,
  currentLanguage: PropTypes.string,
  handleFormSubmit: PropTypes.func
}
