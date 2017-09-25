import React, { Component } from 'react'
import PropTypes from 'prop-types'

/* 
Comunicacion padres a hijos
  Por medio de props
  PropTypes sirve para validar las propiedades pasadas a los hijos. https://facebook.github.io/react/docs/typechecking-with-proptypes.html
  Se pueden hacer que las propiedades sean reuired por medio de la la validacion de las propiedades.
*/

export default class TitleComponent extends Component {
  static get propTypes () {
    return {
      title: PropTypes.string.isRequired
    }
  }

  render () {
    return <h1>{`Hello ${this.props.title}!`}</h1>
  }
}

/* 
// Se puede hacer fuera de la clase la validacion de las props

TitleComponent.propTypes = {
  title: PropTypes.number,
  logo: PropTypes.string
}
*/
