import React, { Component } from 'react';
import Proptypes from 'prop-types';
import TeacherTitle from './../components/teacherTitle';
import TeacherDescription from './../components/teacherDescription';

class Teacher extends Component {
  render () {
    return (
      <div>
        <TeacherTitle {...this.props} />
        <TeacherDescription {...this.props} />
      </div>
    );
  }
};

Teacher.Proptypes = {
  
};

export default Teacher;
