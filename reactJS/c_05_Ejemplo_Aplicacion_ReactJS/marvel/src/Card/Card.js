import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import IconStarOutline from 'react-icons/lib/md/star-outline';
import IconStarFull from 'react-icons/lib/md/star';
import lscache from 'lscache';

export default class Card extends Component {
  constructor (...args) {
    super(...args);
    this.state = {
      isFav: this.props.isFav
    };
    this.addFav = this.addFav.bind(this);
    this.removeFav = this.removeFav.bind(this);
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
  }

  addFav () {
    this.setState({ isFav: true });
    this.saveToLocalStorage();
  }

  removeFav () {
    this.setState({ isFav: false });
    this.saveToLocalStorage();
  }

  saveToLocalStorage () {
    const id = this.props.item.id;
    let favs = lscache.get('favs') || [];
    if (favs.indexOf(id) < 0) {
      favs.push(id);
    } else {
      favs.splice(favs.indexOf(id), 1);
    }
    lscache.set('favs', favs);
  }

  render () {
    const item = this.props.item;
    const img = `${item.thumbnail.path}.${item.thumbnail.extension}`;
    return (
      <div className='card' key={item.id}>
        {this.state.isFav
          ? <IconStarFull onClick={this.removeFav} />
          : <IconStarOutline onClick={this.addFav} />}
        <img src={img} className='card-image' alt={item.name}/>
        <div className='card-content'>
          <h2 className='card-title'>{item.name}</h2>
          <p className='card-description'>{item.description}</p>
        </div>
      </div>
    );
  }
}

Card.PropTypes = {
  item: PropTypes.object,
  isFav: PropTypes.bool
};
