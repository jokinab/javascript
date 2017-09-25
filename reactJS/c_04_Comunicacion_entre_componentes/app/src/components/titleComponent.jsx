import React from 'react'
import PropTypes from 'prop-types'
import { translations } from './../data'

/* 
Comunicacion padres a hijos
  Por medio de props
  PropTypes sirve para validar las propiedades pasadas a los hijos. https://facebook.github.io/react/docs/typechecking-with-proptypes.html
  Se pueden hacer que las propiedades sean reuired por medio de la la validacion de las propiedades.
*/

export default function TitleComponent (props) {
  const { language, title } = props
  return (<h1 className='title'>{translations[language]['TITLE'].replace('%name%', title)}</h1>)
}

// Se puede hacer fuera de la clase la validacion de las props

TitleComponent.propTypes = {
  title: PropTypes.string,
  logo: PropTypes.string
}
