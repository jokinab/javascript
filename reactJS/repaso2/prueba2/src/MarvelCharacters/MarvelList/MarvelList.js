import React, { Component } from 'react';
import MarvelListItem from './../MarvelListItem/MarvelListItem';
import MarvelListPagination from './../MarvelListPagination/MarvelListPagination';
import { Redirect } from "react-router-dom";
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
      PageMarvel: this.props.match.params.hasOwnProperty('PageMarvel') && Number.isInteger(parseInt(this.props.match.params.PageMarvel)) ? this.props.match.params.PageMarvel : '1',
      isLoading: true,
      marvelResult: '',
      ApiError: false,
      totalCharacters: 0,
      totalPages: 0,
      isValidPage: this.props.match.params.hasOwnProperty('PageMarvel') && Number.isInteger(parseInt(this.props.match.params.PageMarvel)) ? true : false       
    };
  }

  componentDidMount () {
    
    if ( !this.state.isValidPage ) return;

    const offset =  (this.state.PageMarvel-1)*20;
    const FETCH_URL = `${API_URL}/characters?offset=${offset}&${APIKEY_QUERYSTRING}`;
    
    fetch(FETCH_URL)
      .then(res => res.json())
      .then(res => {
        if ( res.status === 'Ok' ) {
            this.setState(
              { 
                ApiError: false, 
                isLoading: false, 
                marvelResult: res.data, 
                totalCharacters: parseInt(res.data.total),
                totalPages: Math.floor( parseInt(res.data.total) / 20) ,
                isValidPage: true
              }
            );
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
        
          { !this.state.isValidPage &&  <Redirect to="/characters/1"/>}
          { this.state.isLoading && <IsLoadingMarvel />}
        
          { !this.state.isLoading && !this.state.ApiError && this.state.isValidPage 
            && this.state.marvelResult.results.map((item, index) => <MarvelListItem key={index} marvelItem={item} /> ) }
          { !this.state.isLoading && this.state.ApiError && <ApiErrorNotExist /> }
          
          <div className="container-pagination">
            { ( !this.state.isLoading && !this.state.ApiError ) && this.state.isValidPage &&
                <MarvelListPagination currentPage={this.state.PageMarvel} totalPages={this.state.totalPages} /> }
          </div>
        
        </div>        
      </div>
    )
  }
}
