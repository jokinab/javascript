import React, { Component } from 'react';
import PropTypes from 'prop-types';

const API_URL = 'https://gateway.marvel.com:443/v1/public';
const APIKEY_QUERYSTRING = 'apikey=1746232ad739a6d56e75f025d04655f9';

export default class MarvelItemComponent extends Component {
  
  constructor (...args) {
    super (...args);
    this.state = {
      results: {},
      isLoading: true,
      imagePath: '' 
    }
  }

  componentDidMount () {
    
    const FETCH_URL = `${API_URL}/characters/${this.props.marvelId}?${APIKEY_QUERYSTRING}`;
    
    fetch(FETCH_URL)
      .then(res => res.json())
      .then(res => {
        this.setState({ results: res.data.results, isLoading: false });
        this.setState({ imagePath: `${res.data.results[0].thumbnail.path}.${res.data.results[0].thumbnail.extension}`, isLoading: false });
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.results);
    const link = (typeof this.state.results[0] == 'undefined' ) ? '' : this.state.results[0].urls[0].url; 
    const name = (typeof this.state.results[0] == 'undefined' ) ? '' : this.state.results[0].name;
    return (
      <td className="marvelitemcomponent">
        <img src={this.state.imagePath} width="60" height="60" alt={name}/>
        <h4><a href={link} target="_blank" rel="noopener noreferrer" title="{name}">{name}</a></h4>
      </td>
    )
  }
}

MarvelItemComponent.propTypes = {
  marvelId: PropTypes.string
}