import React from 'react';

import { createStore, applyMiddleware  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers/root';
import { Provider } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from "react-router-dom";

import './App.css';

import MarvelList from './containers/MarvelList/MarvelList';
import MarvelCharacterItem from './containers/MarvelCharacterItem/MarvelCharacterItem';
import Header from './containers/Header/Header';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpider, faStar, faComment } from '@fortawesome/free-solid-svg-icons';

library.add(faSpider, faStar, faComment);

// Creamos nuestro store en el punto de entrada de la app pasandole el reducer
const store = createStore(
  rootReducer,composeWithDevTools(
  applyMiddleware(
    thunkMiddleware // nos permite despachar funciones
  )
))


const App = () => (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <main className="main-content">
            <Switch>
              <Route path="/characters/:PageMarvel?" component={MarvelList} />
              <Route path="/character/:MarvelItem" component={MarvelCharacterItem} />
            </Switch>
          </main>
        </div>
      </Router>
    </Provider>
);

export default App;
