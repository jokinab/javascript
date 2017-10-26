import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { TeacherTitle, TeacherDescription } from './../components';
import { connect } from 'react-redux';

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
  id: Proptypes.string
};

// ownProps es un nuevo parametro que espera recibir la funcion que le pasamos al parametro
// Con esto y sabiendo que react Rouer guarda los parametros de la URL en una propiedad params, podemos construir la nueva forma de las propiedades
// que le vamos a pasar a nuestro componente. 

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps.params,
    ...state.teacher,
    id: ownProps.match.params.id
  };
};

export default connect(mapStateToProps)(Teacher);
