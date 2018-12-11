import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import './App.css';

import MarvelList from './Containers/MarvelList/MarvelList';

import Header from './Header/Header';
import MarvelContent from './MarvelContent/MarvelContent';
import MarvelCharacterItem from './MarvelCharacterItem/MarvelCharacterItem';
import About from './About/About';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpider, faStar, faComment } from '@fortawesome/free-solid-svg-icons';

library.add(faSpider, faStar, faComment);

class App extends Component {
  constructor (...args) {
    super(...args)
    this.state = {
      currentLanguage: 'es',
      languages: ['es', 'eus', 'en']
    }
    this.handleLangChange = this.handleLangChange.bind(this);

  }

  handleLangChange (lang) {
    this.setState({currentLanguage: lang});
  }

  render() {
    return (
      <div className="App">
        <Header currentLanguage={this.state.currentLanguage} languages={this.state.languages} handleLangChange={this.handleLangChange}/>
        <main className="main-content">
          <Switch>
            <Route exact path="/" component={ (props) => <MarvelContent currentLanguage={this.state.currentLanguage} languages={this.state.languages} {...props}/> } /> } />
            <Route exact path="/about" component={ (props) => <About currentLanguage={this.state.currentLanguage} languages={this.state.languages} {...props}/> } /> }/>
            <Redirect exact path="/characters/" to="/characters/1" />
            <Route path="/characters/:PageMarvel" component={ (props) => <MarvelList currentLanguage={this.state.currentLanguage} languages={this.state.languages} {...props}/> } />
            <Route path="/character/:MarvelItem" component={ (props) => <MarvelCharacterItem currentLanguage={this.state.currentLanguage} languages={this.state.languages} {...props}/> } />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
