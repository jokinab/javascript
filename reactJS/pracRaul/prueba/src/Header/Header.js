import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Header extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      name: 'Prueba Header',
      lang: ''
    }
  }
  render() {
    return (
      <div className="header">
        <h1 className="heder-tit">{ this.state.name }</h1>
        <p>{this.props.currentLang}</p>
        <select defaultValue={this.props.currentLang} onChange={this.props.onChangeLang}>
          { this.props.languages.map( (itemLang, index) => {
              return ( <option key={index} value={itemLang}> {itemLang} </option>)
          })
          }
        </select>
      </div>
    )
  }
}

Header.propTypes = {
  currentLang: PropTypes.string,
  languages: PropTypes.array,
  onChangeLang: PropTypes.func
}

