import React, { Component } from 'react';
import Proptypes from 'prop-types';
import './teacher.css';
import TeacherTitle from './teacherTitle';
import TeacherDescription from './teacherDescription';


class Teacher extends Component {
  render () {
    return(
      <div>
        <TeacherTitle {...this.props} />
        <TeacherDescription {...this.props} />
      </div>
    );
  }
};

Proptypes.Teacher = { 

};

export default Teacher;
