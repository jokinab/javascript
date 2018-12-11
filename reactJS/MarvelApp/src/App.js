import React from 'react';
import { createStore } from 'redux';
import rootReducer from './reducers/root';
import { Provider } from 'react-redux';

import { Switch, Route } from "react-router-dom";

import './App.css';

import MarvelList from './containers/MarvelList/MarvelList';
import MarvelCharacterItem from './containers/MarvelCharacterItem/MarvelCharacterItem';
import Header from './containers/Header/Header';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpider, faStar, faComment } from '@fortawesome/free-solid-svg-icons';

library.add(faSpider, faStar, faComment);

let store = createStore(rootReducer); // Creamos nuestro store en el punto de entrada de la app pasandole el reducer

console.log(store.getState());

const App = () => (
    <Provider store={store}>
      <Header />
      <main className="main-content">
        <Switch>
          <Route path="/characters/:PageMarvel" component={ (props) => <MarvelList currentLanguage={this.state.currentLanguage} languages={this.state.languages} {...props}/> } />
          <Route path="/character/:MarvelItem" component={ (props) => <MarvelCharacterItem currentLanguage={this.state.currentLanguage} languages={this.state.languages} {...props}/> } />
        </Switch>
      </main>
    </Provider>
);

export default App;
