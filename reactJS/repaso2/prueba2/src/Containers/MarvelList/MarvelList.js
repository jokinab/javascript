import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import ApiMarvel from './../../ApiMarvel/ApiMarvel';

import MarvelCard from './../../Components/MarvelCard/MarvelCard';

import ListPagination from './../../Components/ListPagination/ListPagination';
import { IsLoading } from './../../Components/IsLoading/IsLoading';


export default class MarvelList extends Component {
  constructor(...args){
    super(...args);
    this.state={
      isLoading: true,
      marvelResult: '',
    };
  }

  async componentDidMount() {

    if ( !(this.props.match.params.hasOwnProperty('PageMarvel') && Number.isInteger(parseInt(this.props.match.params.PageMarvel)))) return;

    try {
      const charactersMarvel = await ApiMarvel.getMarvelCharactersPage( this.props.match.params.PageMarvel );
      const res = await charactersMarvel.json();

      this.setState( { isLoading: false, marvelResult: res } );

    } catch (error) {
        throw new Error(error);
    }

  }

  render() {

    return (
      <div className="todocontent">
        <div className="container-body">
          <div className="cards-list">

            { ! ( this.props.match.params.hasOwnProperty('PageMarvel') && Number.isInteger( parseInt(this.props.match.params.PageMarvel) ) )
                && <Redirect to="/characters/1"/> }

            { this.state.isLoading && <IsLoading /> }

            { ! this.state.isLoading && this.state.marvelResult.status === 'Ok'
                && this.state.marvelResult.data.results.map( (item, index) => <MarvelCard key={index} marvelItem={item} /> )
            }

          </div>
          <div className="container-pagination">
            { !this.state.isLoading && this.state.marvelResult.status === 'Ok' &&
                <ListPagination baseLink={'/characters/'} currentPage={this.props.match.params.PageMarvel} totalPages={Math.floor( parseInt(this.state.marvelResult.data.total) / 20)} /> }
          </div>
        </div>
      </div>
    )
  }
}
