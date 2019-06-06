import * as types from './../actions/actionTypes';

// Estado inicial de la aplicacion
const initialState = {
  counter: 0
};

// Este es el reductor. Dado un estado inicial y una accion, devuelve un nuevo estado de la aplicacion
const counterApp = (state = initialState, action) => {
  switch (action.type) {
    case types.INCREMENT:
      return {
        Object.assign( {}, { counter: state.counter + 1} )
      };
    default:
      return state;
  }
};

export default counterApp;
