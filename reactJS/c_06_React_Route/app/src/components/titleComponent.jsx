import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translations } from './../data'
import { languages } from './../config'

/* 
Comunicacion padres a hijos
  Por medio de props
  PropTypes sirve para validar las propiedades pasadas a los hijos. https://facebook.github.io/react/docs/typechecking-with-proptypes.html
  Se pueden hacer que las propiedades sean reuired por medio de la la validacion de las propiedades.
*/

export default class TitleComponent extends Component {
  constructor (props, context) {
    super(props)
  }
  render () {
    const currentLang = Object.assign({}, translations[this.context.language]);
    const currentTitle = String(currentLang['TITLE']);

    return (
      <h1 className='title'>
        { currentTitle.replace('%name%', this.props.title) }
      </h1>
    );
  }
}

// Se puede hacer fuera de la clase la validacion de las props

TitleComponent.propTypes = {
  title: PropTypes.string,
  logo: PropTypes.string
}

TitleComponent.contextTypes = {
  language: PropTypes.oneOf(languages)
};
