import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MarvelItemComponent from './MarvelItemComponent/MarvelItemComponent';

export default class ListRow extends Component {
  constructor (...args) {
    super(...args);
    this.state = {
      itemContent: this.props.itemContent
    }

    this.getMarvelItem = this.getMarvelItem.bind(this);
   
  }

  render() {
    const ObjectItems = this.props.itemContent;
    return (
      <tr className="List-Row">
        { 
          Object.keys(ObjectItems).map( function(keyItem, index) {
              if ( keyItem === 'marvelItem' ) {
                return (<MarvelItemComponent  key={index} marvelId={ObjectItems[keyItem]} />)
              }else{
                return (<td key={index}><span>{ObjectItems[keyItem]}</span></td>)
              }
          })
        }
      </tr>
    )
  }
}

ListRow.propTypes = {
  itemContent: PropTypes.object
}