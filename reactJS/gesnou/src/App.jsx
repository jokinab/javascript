// Dependencias React
import React, { useState } from 'react'

// Dependencias Redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

// Reducers
import rootReducer from './reducers/root.js';

// Containers
import ButtonContainer from './containers/ButtonContainer.jsx'

import './App.css'

// Creamos nuestro store en el punto de entrada de la app pasandole el reducer
const store = createStore(
  rootReducer,composeWithDevTools(
  applyMiddleware(
    thunkMiddleware // nos permite despachar funciones
  )
))


const App = () => {
  console.log('estado: ',store.getState())

  return (
    <Provider store={store}>
      <ButtonContainer />  
    </Provider>
  )
}

export default App