import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {LangsString} from './../lang/Lang';
import { Switch, Route } from "react-router-dom";
import MarvelList from './MarvelList/MarvelList';

export default class MarvelCharacters extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.path}`} component={(props)=> <MarvelList currentLanguage={this.props.currentLanguage} languages={this.props.languages} {...props} /> }/>
        <Route path={`${this.props.match.path}/:PageMarvel`} component={(props)=> <MarvelList currentLanguage={this.props.currentLanguage} languages={this.props.languages} {...props}/> }/>
      </Switch>  
    )
  }
}

MarvelCharacters.propTypes = {
  currentLanguage: PropTypes.string,
  languages: PropTypes.array,
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object
}
