import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Teacher from './teacher';
import './teachers.css';

const Teachers = ({teachers}) => {
  return (
    <ul className='teachersList'>
      {teachers.map((teacher) => <Teacher key={teacher.id} {...teacher} />)}
    </ul>
  );
};

Proptypes.TeacherList = {
  teachers: Proptypes.array
};

export default Teachers;
