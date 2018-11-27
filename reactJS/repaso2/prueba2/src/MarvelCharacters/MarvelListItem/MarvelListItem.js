import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class MarvelListItem extends Component {
  render() {
    return (
      <article className="marvel-list-item">
        {console.log(this.props)}
        <img src={`${this.props.marvelItem.thumbnail.path}.${this.props.marvelItem.thumbnail.extension}`} 
            alt={this.props.marvelItem.name} 
            className="marvel-item-img" />
        <div className="marvel-item-cnt">
          <h2 className="marvel-item-name"><Link to={`/character/${this.props.marvelItem.id}`}>{this.props.marvelItem.name}</Link></h2>
          <p className="marvel-item-desc">{this.props.marvelItem.description}</p>
        </div>
      </article>
    )
  }
}
