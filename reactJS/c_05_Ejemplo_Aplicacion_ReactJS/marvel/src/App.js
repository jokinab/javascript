import React, { Component } from 'react';
import Logo from './Logo/logo';
//import dummyData from './dummyData';
import './App.css';
import Card from './Card/Card';
import { PropTypes } from 'prop-types';
import Searcher from './Searcher/Searcher';

const API_URL = 'http://gateway.marvel.com:80/v1/public';
const APIKEY_QUERYSTRING = 'apikey=1746232ad739a6d56e75f025d04655f9';

export default class App extends Component {
  constructor (...args) {
    super(...args);
    this.state = {
      initialState: true,
      isLoading: false,
      results: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (textToSearch) {
    this.setState({ initialState: false, isLoading: true });
    const FETCH_URL = `${API_URL}/characters?nameStartsWith=${textToSearch}&${APIKEY_QUERYSTRING}`;
    fetch(FETCH_URL)
      .then(res => res.json())
      .then(res => {
        this.setState({ results: res.data.results, isLoading: false });
      })
      .catch(err => console.log(err));
  }

  handleClick (event) {
    console.log('Button clicked');
  }

  render () {
    return (
      <div className='container'>

        <Logo isCentered={true} />

        <Searcher
          isLoading={this.state.isLoading}
          onSubmit={this.handleSubmit}
        />

        {this.state.initialState &&
          <p className='has-text-centered'>Por favor, usa el formularion para buscar nuevos resultados</p>}        
        <div className='results'>
          {this.state.results.map(item => <Card item={item} key={item.id}/>)}
        </div>
      </div>
    );
  }
}
