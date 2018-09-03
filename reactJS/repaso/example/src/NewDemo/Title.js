import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Title extends Component {
  render () {
    return (
      <h2 className='title'>{this.props.name}</h2>
    )
  }
}

Title.propTypes = {
  name: PropTypes.string.isRequired
}
