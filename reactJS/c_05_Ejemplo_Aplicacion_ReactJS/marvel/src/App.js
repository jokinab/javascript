import React, { Component } from 'react';
import Logo from './Logo/logo';
import './App.css';
import Card from './Card/Card';
import Searcher from './Searcher/Searcher';
import lscache from 'lscache';

const API_URL = 'http://gateway.marvel.com:80/v1/public';
const APIKEY_QUERYSTRING = 'apikey=1746232ad739a6d56e75f025d04655f9';

export default class App extends Component {
  constructor (...args) {
    super(...args);
    this.state = {
      initialState: true,
      isLoading: false,
      results: [],
      favs: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    const favs = lscache.get('favs') || [];
    this.setState({ favs: favs });
  }

  handleSubmit (textToSearch) {
    this.setState({ initialState: false, isLoading: true });
    const FETCH_URL = `${API_URL}/characters?nameStartsWith=${textToSearch}&${APIKEY_QUERYSTRING}`;
    fetch(FETCH_URL)
      .then(res => res.json())
      .then(res => {
        this.setState({ results: res.data.results, isLoading: false });
        console.log(res);
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
          {this.state.results.map(item => {
            return (
              <Card
                item={item}
                key={item.id}
                isFav={this.state.favs.some(id => item.id === id)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
