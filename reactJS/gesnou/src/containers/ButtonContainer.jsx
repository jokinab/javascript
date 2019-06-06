// Dependencias React
import React, { useState } from 'react'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { increaseCounter } from './../actions/buttonCounter.js'

import Button from './../components/Button.jsx'

const ButtonComponent = ( {counter, color, onClickButton} ) => {

  console.log('props en el container: ',counter)
  const handleButtonClick = () => {
    console.log(counter)
    onClickButton(counter)
    
  }

  return (
    <Button clickButton={handleButtonClick} counter={counter} color={color} />
  )
}

ButtonComponent.propTypes = {
  counter: PropTypes.number,
  onClickButton: PropTypes.func
}

// Mapeamos el estado a las propiedades.
const mapStateToProps = (state) => {
  return {
    counter: state.increaseCounter.counter,
    color: state.headerReducer.color
  }  
}  

// Mapeamos las acciones a las propiedades.
const mapDispatchToProps = (dispatch) => {
  return {
    onClickButton: () => dispatch(increaseCounter())
  }
}

// Conectamos el Componente al storage
const ButtonContainer = connect(mapStateToProps, mapDispatchToProps)(ButtonComponent)


// Exportamos el Container
export default ButtonContainer
