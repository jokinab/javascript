// Dependencias React
import React, { useState } from 'react'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { increaseCounter } from './../actions/buttonCounter.js'

import Button from './../components/Button.jsx'

const ButtonComponent = (props) => {

  console.log('props en el container: ',props)
  const handleButtonClick = () => {
    props.onClickButton(props.counter)
    
  }

  return (
    <Button clickButton={handleButtonClick} counter={props.counter} />
  )
}

ButtonComponent.propTypes = {
  counter: PropTypes.string,
  onClickButton: PropTypes.func
}

// Mapeamos el estado a las propiedades.
const mapStateToProps = (state) => {
  return {
    ...state.counter
  }
}

// Mapeamos las acciones a las propiedades.
const mapDispatchToProps = (dispatch) => {
  return {
    onClickButton: (n) => dispatch(increaseCounter(n))
  }
}

// Conectamos el Componente al storage
const ButtonContainer = connect(mapStateToProps, mapDispatchToProps)(ButtonComponent)


// Exportamos el Container
export default ButtonContainer
