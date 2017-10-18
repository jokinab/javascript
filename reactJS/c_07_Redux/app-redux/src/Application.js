import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import counterApp from './reducers/counterApp'
import Appli from './containers/App'
import { Provider } from 'react-redux'



let store = createStore(counterApp);

const Application = () => (
  <Provider store={store}>
    <Appli />
  </Provider>
);

export default Application;
