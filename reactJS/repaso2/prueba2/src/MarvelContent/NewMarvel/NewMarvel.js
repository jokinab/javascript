import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormNewMarvel from './FormNewMarvel/FormNewMarvel';
import { LangsString } from '../../lang/Lang';

export default class NewMarvel extends Component {

  render() {
    return (
      <div className="newtodo">
        <h3 className="new-title">{ LangsString.NewTodoTitle[this.props.currentLanguage] }</h3>
        <FormNewMarvel languages={this.props.languages} 
              currentLanguage={this.props.currentLanguage} 
              handleFormSubmit={this.props.handleFormSubmit} />
      </div>
    )
  }
}

NewMarvel.propTypes = {
  onNeWMessage: PropTypes.func,
  languages: PropTypes.array,
  currentLanguage: PropTypes.string,
  handleFormSubmit: PropTypes.func
}
