import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header';
import Body from './Body/Body';

class App extends Component {
  constructor(...args) {
    super(...args);
    this.state= {
      currentLang: 'Es',
      languages: ['Es', 'Eus', 'En']
    }
    this.handleLangChange = this.handleLangChange.bind(this);
  }

  handleLangChange(evt) {
    console.log(evt.target);
    this.setState({currentLang: evt.target.value});
  }  

  render() {
    return (
      <div className="App">
        <Header currentLang={this.state.currentLang} languages={this.state.languages} onChangeLang={this.handleLangChange}/>
        <Body currentLang={this.state.currentLang} />
      </div>
    );
  }
}

export default App;
