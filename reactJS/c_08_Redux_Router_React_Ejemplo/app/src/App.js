import React, { Component } from 'react';
import { createStore } from 'redux';
import { searcher } from './reducers';
import { Provider } from 'react-redux';
import { Searcher } from './containers';

let store = createStore(searcher); // Creamos nuestro store en el punto de entrada de la app pasandole el reducer

const App = () => (
  <Provider store={store}>
    <Searcher />
  </Provider>
);

export default App;
