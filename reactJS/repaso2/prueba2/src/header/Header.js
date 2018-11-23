import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from './Menu/Menu';

export default class Header extends Component {

  constructor (...args) {
    super(...args)
    this.state = {
      
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (evt) {

    evt.preventDefault();
    console.log(evt.target.value);
    this.props.handleLangChange(evt.target.value);
  }

  render() {
    return (
      <div className="header">
        <div className="container-hdr">
          <FontAwesomeIcon icon="mask" size="4x" />
          <Menu />
          <select value={this.props.currentLanguage} className="lang-list" onChange={this.handleChange}>
            {this.props.languages.map((langItem, index) => {
              return (
                <option value={ langItem } key={index}>{langItem}</option>
              );          
            } )}
          </select>
        </div>  
      </div>
    )
  }
}


Header.propTypes = {
  currentLanguage: PropTypes.string,
  languages: PropTypes.array,
  handleLangChange: PropTypes.func
}
