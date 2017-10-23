import React, { Component } from 'react';
import Proptypes from 'prop-types';

const TeacherDescription = ({ avatar, description }) => (
  <div className='description-wraper'>
    <img src={avatar} className='avatar' />
    <p className='description-text'>{description}</p>
  </div>
);

export default TeacherDescription;
