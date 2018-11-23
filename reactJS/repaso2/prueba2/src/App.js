import React, { Component } from 'react';
import './App.css';
import Header from './header/Header';
import MarvelContent from './MarvelContent/MarvelContent';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faMask } from '@fortawesome/free-solid-svg-icons';

library.add(faMask);

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
        <MarvelContent currentLanguage={this.state.currentLanguage} languages={this.state.languages} />
      </div>
    );
  }
}

export default App;
