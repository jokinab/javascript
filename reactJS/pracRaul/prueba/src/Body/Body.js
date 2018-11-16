import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { langs } from "./../Lang/langs";

export default class Body extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      name: 'Body',
      lang: ''
    }
  }
  render() {
    return (
      <div className="Body">
        { langs.nameBody[this.props.currentLang] }
      </div>
    )
  }
}

Body.propTypes = {
  currentLang: PropTypes.string,
}

