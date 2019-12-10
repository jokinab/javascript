import React from 'react';
import { createStore, applyMiddleware  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import rootReducer from './reducers/root';

import BuscadorSki from './containers/buscadorSki/BuscadorSki';

import './App.css';


const store = createStore(
  rootReducer,composeWithDevTools(
  applyMiddleware(
    thunkMiddleware // nos permite despachar funciones
  )
))


const App = () => {
  return (
    <Provider store={store}>
      <BuscadorSki />
    </Provider>     
  );
}

export default App;
