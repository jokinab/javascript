import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header';
import Body from './Body/Body';
import Body2 from './Body2/Body2';

class App extends Component {
  constructor(...args) {
    super(...args);
    this.state= {
      currentLang: 'Es',
      languages: ['Es', 'Eus', 'En']
    }
    this.handleLangChange = this.handleLangChange.bind(this);
    this.getChildProp = this.getChildProp.bind(this);
  }

  handleLangChange(evt) {
    console.log(evt.target);
    this.setState({currentLang: evt.target.value});
  }  

  getChildProp(arg) {
    console.log(arg);
  }

  render() {
    return (
      <div className="App">
        <Header currentLang={this.state.currentLang} languages={this.state.languages} onChangeLang={this.handleLangChange} getChildProp={this.getChildProp}/>
        <Body currentLang={this.state.currentLang} />
      </div>
    );
  }
}

export default App;
