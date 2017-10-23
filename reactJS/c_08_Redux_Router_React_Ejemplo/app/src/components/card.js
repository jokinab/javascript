import React, { Component } from 'react';
import Proptypes from 'prop-types';
import './card.css';

const Card = ({ id, avatar, name, description }) => {
  return (
    <li className='teacher'>
      <img className='teacher-avatar' src={avatar} alt={name} />
      <h2 className='teacher-name'>{name}</h2>
      <p className='teacher-description'>{description}</p>
      <a href={`teacher/${id}`}>Ir a la pagina del profesor</a>
    </li>
  );
};

Proptypes.Card = {
  id: Proptypes.number,
  avatar: Proptypes.string,
  description: Proptypes.string,
  name: Proptypes.string
};

export default Card;
