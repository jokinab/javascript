// Dependencias React
import React, { useState } from 'react'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { increaseCounter, decrementCounter } from './../actions/buttonCounter.js'

import Button from './../components/Button.jsx'

const ButtonComponent = ( {counter, color, onClickButtonIncrease, onClickButtonDecrement} ) => {

  return (
    <div>
      <Button clickButton={() => onClickButtonIncrease() } color={color} sign={'+'} />
      <span>{counter}</span>
      <Button clickButton={() => onClickButtonDecrement() } color={color}  sign={'-'} />
    </div>
  )
  
}

ButtonComponent.propTypes = {
  counter: PropTypes.number,
  onClickButtonIncrease: PropTypes.func,
  onClickButtonDecrement: PropTypes.func
}

// Mapeamos el estado a las propiedades.
const mapStateToProps = (state) => {
  return {
    counter: state.counterReducer.counter,
    color: state.headerReducer.color
  }  
}  

// Mapeamos las acciones a las propiedades.
const mapDispatchToProps = (dispatch) => {
  return {
    onClickButtonIncrease: () => dispatch(increaseCounter()),
    onClickButtonDecrement: () => dispatch(decrementCounter())
  }
}

// Conectamos el Componente al storage
const ButtonContainer = connect(mapStateToProps, mapDispatchToProps)(ButtonComponent)


// Exportamos el Container
export default ButtonContainer
