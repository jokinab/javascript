import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Counter } from './../components/Counter';
import InputList from './../components/InputList';
import { connect } from 'react-redux';
import { increment } from './../actions/increment';

// Componente contenedor. Es consciente de Redux, y conecta la logica de la aplicacion con los componentes de presentacion
class ReduxExample extends Component {

  render () {
    return (
      <div>
        <Counter counter={this.props.counter} onAdd={this.props.onAdd} />
        <InputList counter={this.props.counter} />
      </div>
    );
  }
}

// Mapeamos el estado a las propiedades del componente contenedor
const mapStateToProps = (state) => state;

// Mapeamos las acciones a despatchar a las propiedades del componente contenedor
const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: () => dispatch(increment())
  };
};

// Propiedades recibidas popr el componente contenedor
ReduxExample.propTypes = {
  counter: Proptypes.number,
  onAdd: Proptypes.func
};

// Creamos y exportamos un componente de orden superior con los mapeos hechos de las actions y el estado 
export default connect(mapStateToProps, mapDispatchToProps)(ReduxExample);
