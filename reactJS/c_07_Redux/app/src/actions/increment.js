import * as types from './actionTypes';

// Esta es una funcion action creator. Se pone para no poner la action en la vista y desacoplar asi el componente 
export const increment = () => {
  return {
    type: types.INCREMENT
  };
};
