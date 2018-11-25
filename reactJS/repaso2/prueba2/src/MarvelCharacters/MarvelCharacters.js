import React, { Component } from 'react';
import {LangsString} from './../lang/Lang';

export default class MarvelCharacters extends Component {
  constructor (...args) {
    super(...args);
    this.state = {
      pageApi: this.props.match.params.MarvelPage 
    };
  }
  
  render() {
    return (
      <div>
        <h1>{ LangsString.MarvelCharactersList[this.props.currentLanguage]}</h1>
        <h2>{this.state.pageApi}</h2>
        
      </div>  
    )
  }
}
