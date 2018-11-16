import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LangsString } from '../../../lang/Lang';

const API_URL = 'https://gateway.marvel.com:443/v1/public';
const APIKEY_QUERYSTRING = 'apikey=1746232ad739a6d56e75f025d04655f9';

const LoadingMessage = () => {
  return (
    <div>
      <span>Loading</span>
    </div>
  )
}

const SelectMarvel = (props) => {
  return (
    <div className="input-field">
      <label className="newLabel" htmlFor="Rate">{ LangsString.SelectMarvel[props.currentLanguage] }</label>
      <select onChange={props.handleMarvelSelection}>
        {props.marvelItems.map( (marvelItem, index) => {
          return (
            <option value={marvelItem.id} key={index}>{marvelItem.name}</option>
          )
        })}
      </select>
    </div>  
  )
}

export default class MarvelSelectList extends Component {
  constructor (...args) {
    super(...args);
    this.state = {
      results:'',
      isLoading: true
    }
    this.handleMarvelSelection = this.handleMarvelSelection.bind(this);
  }
  
  handleMarvelSelection (event) {
    this.props.handleMarvelSelect(event.target.value);
  }
  
  componentDidMount () {
    
    const FETCH_URL = `${API_URL}/characters?${APIKEY_QUERYSTRING}`;
    
    fetch(FETCH_URL)
      .then(res => res.json())
      .then(res => {
        this.setState({ results: res.data.results, isLoading: false });
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="marvelselectlist">
        { this.state.isLoading && <LoadingMessage /> }
        { !this.state.isLoading && <SelectMarvel handleMarvelSelection={this.handleMarvelSelection} 
                                                  marvelItems={this.state.results} 
                                                  currentLanguage={this.props.currentLanguage}/>}
      </div>
    )
  }
}

MarvelSelectList.propTypes = {
  handleMarvelSelect: PropTypes.func,
  currentLanguage: PropTypes.string
}