import React from 'react';
import Proptypes from 'prop-types';
import Card from './card';
import './teacherList.css';

const TeacherList = ({teachers}) => {
  return (
    <ul className='teachersList'>
      {teachers.map((teacher) => <Card key={teacher.id} {...teacher} />)}
    </ul>
  );
};

Proptypes.TeacherList = {
  teachers: Proptypes.array
};

export default TeacherList;
