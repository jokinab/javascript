import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export default function Card (props) {
  const item = props.item;
  const img = `${item.thumbnail.path}.${item.thumbnail.extension}`;
  return (
    <div className='card'>
      <img src={img} className='card-image' alt={item.name}/>
      <div className='card-content'>
        <h2 className='card-title'>{item.name}</h2>
        <p className='card-description'>{item.description}</p>
      </div>
    </div>
  );
}

Card.PropTypes = {
  item: PropTypes.object
};
