import React from 'react';
import Proptypes from 'prop-types';

const TeacherTitle = ({name}) => (
  <h2 className='title'>{name}</h2>
);

Proptypes.TeacherTitle = {
  name: Proptypes.string
};

// Specifies the default values for props:

TeacherTitle.defaultProps = {
  name: 'Teacher Name'
};

export default TeacherTitle;
