import React, { Component } from 'react';
import { createStore } from 'redux';
import counterApp from './reducers/counterApp';
import App from './containers/App';
import { Provider } from 'react-redux';

let store = createStore(counterApp);

const ReduxExample = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ReduxExample;
