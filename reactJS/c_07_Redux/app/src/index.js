import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import counterApp from './reducers/counterApp';
import App from './containers/App';
import { Provider } from 'react-redux';
import { logger } from './middleware/logger';

let store = createStore(counterApp, applyMiddleware(logger));

const ReduxExample = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ReduxExample;



