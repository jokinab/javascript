import React, { Component } from 'react';
import PropTypes from 'prop-types';

const IsLoadingMarvel = () => {
  return (
    <h3 className="marvel-loading">Loading...</h3>
  );
}

const CharacterMarvelNotExist = () => {
  return (
    <h3 className="marvel-loading">Character Not Exists!!!</h3>
  );
}

const CharacterMarvel = (props) => {
  console.log(props);
  return (
    <h1>Character Exist!!!</h1>
  );
}

const API_URL = 'https://gateway.marvel.com:443/v1/public';
const APIKEY_QUERYSTRING = 'apikey=1746232ad739a6d56e75f025d04655f9';

export default class MarvelCharacterItem extends Component {
  constructor (...args) {
    super(...args);
    this.state = {
      characterExist: false,
      isLoading: true,
      marvelResult: ''
    };
  }

  componentDidMount () {
    
    const FETCH_URL = `${API_URL}/characters/${this.props.match.params.MarvelItem}?${APIKEY_QUERYSTRING}`;
    
    fetch(FETCH_URL)
      .then(res => res.json())
      .then(res => {
        if ( res.code === '200' ) {
          this.setState({ characterExist: true, isLoading: false, marvelResult: res });
        }else{
          this.setState({ characterExist: false, isLoading: false, marvelResult: res });
        }
      })
      .catch( err => {
        this.setState(console.log("Error en la Llamada!"));
      });
  }


  render() {
    return (
      <div className="marvelcharacteritem">
        {this.state.isLoading && <IsLoadingMarvel />}
        {!this.state.isLoading && this.state.characterExist && <CharacterMarvel marvelResult={this.state.marvelResult}/>}
        {!this.state.isLoading && !this.state.characterExist && <CharacterMarvelNotExist />}
      </div>
    )
  }
}

MarvelCharacterItem.propTypes = {
  currentLanguage: PropTypes.string,
  languages: PropTypes.array,
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object
}