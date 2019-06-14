import React from "react"
import ReactDOM from "react-dom"

// Dependencias Redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

// App root Component
import App from './App.jsx'

// Reducers
import rootReducer from './reducers/root.js';

// Creamos nuestro store en el punto de entrada de la app pasandole el reducer
const store = createStore(
  rootReducer,composeWithDevTools(
  applyMiddleware(
    thunkMiddleware // nos permite despachar funciones
  )
))


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.querySelector("#root")
)