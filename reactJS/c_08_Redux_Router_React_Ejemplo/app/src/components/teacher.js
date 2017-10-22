import React, { Component } from 'react';
import Proptypes from 'prop-types';
import './teacher.css';

const Teacher = ({ id, avatar, name, description }) => {
  return (
    <li className='teacher'>
      <img className='teacher-avatar' src={avatar} alt={name} />
      <h2 className='teacher-name'>{name}</h2>
      <p className='teacher-description'>{description}</p>
      <a href={`teacher/${id}`}>Ir a la pagina del profesor</a>
    </li>
  );
};

Proptypes.Teacher = {
  id: Proptypes.number,
  avatar: Proptypes.string,
  description: Proptypes.string,
  name: Proptypes.string
};

export default Teacher;
