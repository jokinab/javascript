import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render () {
    return (
      <button type='button' onClick={this.props.onClick}>Press</button>
    )
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired
}
