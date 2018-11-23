import React, { Component } from 'react';
import './App.css';
import Header from './header/Header';
import MarvelContent from './MarvelContent/MarvelContent';
import './App.css';

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
