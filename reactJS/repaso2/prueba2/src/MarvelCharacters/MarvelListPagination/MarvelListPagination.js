import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const LinkToPage = (props) => {
  return ( 
    <div>
      <Link to={`/characters/${props.linkPage}`}>{props.linkPageTxt}</Link>
    </div> 
  )
}

export default class MarvelListPagination extends Component {
  constructor(...args){
    super(...args);
    this.state = {
      currentPage: this.props.currentPage,
      hasGoToFirst: parseInt(this.props.currentPage) - 2  > 0 ? true : false 
    }
  }
  render() {
    return (
      <div className="marvellistpagination">
        { this.state.hasGoToFirst && <LinkToPage linkPage={1} linkPageTxt='<' /> }
        { <LinkToPage linkPage={ parseInt(this.props.currentPage) - 1 }  linkPageTxt={ parseInt(this.props.currentPage) - 1 } /> }
        { <LinkToPage linkPage={ parseInt(this.props.currentPage) } linkPageTxt={ parseInt(this.props.currentPage) } /> }
        { <LinkToPage linkPage={ parseInt(this.props.currentPage) + 1 }  linkPageTxt={ parseInt(this.props.currentPage) + 1} /> }
      </div>
    )
  }
}


MarvelListPagination.propTypes = {
  currentPage: PropTypes.string
}
