import React, { Component } from 'react';
import MarvelListItem from './../MarvelListItem/MarvelListItem';
import MarvelListPagination from './../MarvelListPagination/MarvelListPagination';

const IsLoadingMarvel = () => {
  return (
    <h3 className="marvel-loading">Loading...</h3>
  );
}


const ApiErrorNotExist = () => {
  return (
    <h3 className="marvel-loading">API Error!!!</h3>
  );
}


const API_URL = 'https://gateway.marvel.com:443/v1/public';
const APIKEY_QUERYSTRING = 'apikey=1746232ad739a6d56e75f025d04655f9';


export default class MarvelList extends Component {
  constructor(...args){
    super(...args);
    this.state={
      PageMarvel: this.props.match.params.hasOwnProperty('PageMarvel') ? this.props.match.params.PageMarvel : '1',
      isLoading: true,
      marvelResult: '',
      ApiError: false,
      totalCharacters: 0,
      isValidPage: false
      
    };
  }

  componentDidMount () {
    const page = parseInt(this.state.PageMarvel) !== 'NaN' ? parseInt(this.state.PageMarvel) : '1'
    const offset =  (page-1)*20;

    const FETCH_URL = `${API_URL}/characters?offset=${offset}&${APIKEY_QUERYSTRING}`;
    
    fetch(FETCH_URL)
      .then(res => res.json())
      .then(res => {
        if ( res.status === 'Ok' ) {
          if ( Number.isInteger(parseInt(this.state.PageMarvel)) ) {
            this.setState(
              { ApiError: false, 
                isLoading: false, 
                marvelResult: res.data, 
                totalCharacters: parseInt(res.data.total), 
                isValidPage: true
              }
            );
          }else{
            this.setState(
              { ApiError: false, 
                isLoading: false, 
                marvelResult: res.data, 
                totalCharacters: 1, 
                isValidPage: false
              }
            );
          }  
        }else{
          this.setState({ ApiError: true, isLoading: false, marvelResult: res.data });
        }
      })
      .catch( err => {
        this.setState(console.log("Error en la Llamada!"));
      });
  }

  render() {
  
    return (
      <div className="todocontent">
        <div className="container-body">
          { this.state.isLoading && <IsLoadingMarvel />}
          { !this.state.isLoading && !this.state.ApiError && this.state.isValidPage && this.state.marvelResult.results.map((item, index) => <MarvelListItem key={index} marvelItem={item} /> ) }
          { !this.state.isLoading && this.state.ApiError && <ApiErrorNotExist /> }
          { !this.state.isLoading && !this.state.ApiError && !this.state.isValidPage && <ApiErrorNotExist /> }
          <div className="container-pagination">
            { ( !this.state.isLoading && !this.state.ApiError ) && this.state.isValidPage &&
                <MarvelListPagination currentPage={this.state.PageMarvel} totalCharacters={parseInt(this.state.totalCharacters)}/> }
          </div>
        </div>        
      </div>
    )
  }
}
