import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import './MarvelListPagination.css';

export default class MarvelListPagination extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      currentPage: this.props.currentPage,
      totalPages: this.props.totalPages,
      pageLinks: []    
    }
    this.getPageLinks = this.getPageLinks.bind(this);
    this.getPrevLinks = this.getPrevLinks.bind(this);
    this.getNextLinks = this.getNextLinks.bind(this);
  }

  getPrevLinks(page) {
    
    let numPage = page;
    let manyLinks = 0;
    let prevLinks = [];
    
    while ( ( numPage > 1 ) && ( manyLinks < 3 ) ){
      numPage--;
      prevLinks.unshift( Object.assign( {}, { link: numPage, label: numPage} ) );
      manyLinks++;
    }

    switch ( numPage ) {
      case 0: break;
      case 1: break;
      case 2: 
          prevLinks.unshift( Object.assign( {}, { link: numPage - 1, label: '<<'} ) ); break;
      default: 
          prevLinks.unshift(Object.assign( {}, { link: numPage - 1, label: '<<'} ));  
          prevLinks.unshift(Object.assign( {}, { link: 1, label: '<'} ));
          break;
    } 
    return prevLinks;
  }
  
  getNextLinks(page, totalPages) {

    let numPage = page;
    let manyLinks = 0;
    let nextLinks = [];
    
    while ( ( numPage < totalPages ) && ( manyLinks < 3 ) ){
      numPage++;
      nextLinks.push( Object.assign( {}, { link: numPage, label: numPage} ) );
      manyLinks++;
    }  
    
    switch ( numPage ) {
      case totalPages: break;
      case totalPages - 1: 
          nextLinks.push( Object.assign( {}, { link: numPage + 1, label: '>>'} ) ); break;
      default: 
          nextLinks.push( Object.assign( {}, { link: numPage + 1, label: '>>'} ) );  
          nextLinks.push( Object.assign( {}, { link: totalPages, label: '>'} ) );
          break;
    } 

    return nextLinks;
  }

  getPageLinks(page, totalPages) {

    const prevLinks = ( page > 1 ) ? this.getPrevLinks(page, totalPages) : [];
    const nextLinks = ( page < totalPages ) ? this.getNextLinks(page, totalPages) : [];

    return [...prevLinks, { link: 'none', label: this.state.currentPage}, ...nextLinks];
  }  

  componentDidMount(){
    this.setState({ pageLinks: this.getPageLinks(this.props.currentPage, this.state.totalPages) });
  }

  render() {
    return (
      <ul className="list-pagination">
        { this.state.pageLinks.map( 
            (itemLink, index) =>  
                <li key={index} className="pag-item">
                  { itemLink.link !== 'none' && <Link to={`/characters/${itemLink.link}`} className="pag-link">{itemLink.label}</Link> }
                  { itemLink.link === 'none' && <span className="pag-current">{itemLink.label}</span> }
                </li> 
          )
        }
      </ul>
    )
  }
}

MarvelListPagination.propTypes = {
  currentPage: PropTypes.string,
  totalPages: PropTypes.number
}
