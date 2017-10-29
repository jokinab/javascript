import React from 'react';
import Proptypes from 'prop-types';

const TeacherDescription = ({ avatar, description }) => (
  <div className='description-wraper'>
    <img src={avatar} className='avatar' alt='avatar img' />
    <p className='description-text'>{description}</p>
  </div>
);

Proptypes.TeacherDescription = {
  avatar: Proptypes.string,
  description: Proptypes.string
};

// Specifies the default values for props:

TeacherDescription.defaultProps = {
  avatar: '',
  description: 'Teacher Description'
};

export default TeacherDescription;
