import React, { Component } from 'react';

export default class MarvelListPagination extends Component {
  render() {
    return (
      <div className="marvellistpagination">
        { this.props.currentPage }
      </div>
    )
  }
}
