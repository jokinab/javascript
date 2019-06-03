import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeLanguage } from './../../actions/header';
import PropTypes from 'prop-types';

import Menu from './../../components/Menu/Menu';

const languages = ['es', 'eus', 'en'];

class HeaderComponent extends Component {
  constructor (...args) {
    super(...args)
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (evt) {
    evt.preventDefault();
    this.props.onLangChange(evt.target.value);
  }

  render () {
    return (
      <header className="header">
        <div className="container-hdr">
          <Menu />
          <select value={this.props.currentLanguage} className="lang-list" onChange={this.handleChange}>
            {languages.map((langItem, index) => {
              return (
                <option value={ langItem } key={index}>{langItem}</option>
              )
            })}
          </select>
        </div>
      </header>
    )
  }
}

// Hacemos el tipado de las propiedades del Compnonente.
HeaderComponent.propTypes = {
  currentLanguage: PropTypes.string,
  onLangChange: PropTypes.func
}

// Mapeamos el estado a las propiedades.
const mapStateToProps = (state) => {
  return {
    ...state.header
  };
};

// Mapeamos las acciones a las propiedades.
const mapDispatchToProps = (dispatch) => {
  return {
    onLangChange: (lang) => dispatch(changeLanguage(lang))
  }
}

// Conectamos el Componente al storage
const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);

// Exportamos el Container
export default Header;
