// Dependencias React
import React, { useState } from 'react'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { changeColor } from '../actions/changeColor.js'

import Button from '../components/Button.jsx'

const HeaderComponent = ( {counter, onClickButton} ) => {

  return (
    <button onClick={() => onClickButton()}>Change Button color</button>
  )
}

HeaderComponent.propTypes = {
  onClickButton: PropTypes.func
}

// Mapeamos el estado a las propiedades.
const mapStateToProps = (state) => {
  return {
    
  }  
}  

// Mapeamos las acciones a las propiedades.
const mapDispatchToProps = (dispatch) => {
  return {
    onClickButton: () => dispatch(changeColor())
  }
}

// Conectamos el Componente al storage
const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)


// Exportamos el Container
export default HeaderContainer
