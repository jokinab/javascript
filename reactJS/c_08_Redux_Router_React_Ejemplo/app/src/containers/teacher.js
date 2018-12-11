 import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { TeacherTitle, TeacherDescription } from './../components';
import { connect } from 'react-redux';
import { requestTeacher } from './../actions/teacher';

class Teacher extends Component {
  // Una vez que se monta el componente, se llama a la funcion que va a recuperar la info del teacher a renderizar
  componentDidMount () {
    this.props.onRequestTeacher(this.props.id)
  }

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
  onRequestTeacher: Proptypes.func,
  id: Proptypes.string
};

// ownProps es un nuevo parametro que espera recibir la funcion que le pasamos al parametro
// Con esto y sabiendo que react Router guarda los parametros de la URL en una propiedad params, podemos construir la nueva forma de las propiedades
// que le vamos a pasar a nuestro componente.

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps.params,
    ...state.teacher,
    id: ownProps.match.params.id
  };
};

// Mapeamos las acciones a realizar. Recibira un id
const mapDispatchToProps = (dispatch) => {
  return {
    onRequestTeacher: (id) => dispatch(requestTeacher(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Teacher);
