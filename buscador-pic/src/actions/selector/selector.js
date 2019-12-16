import * as types from './actionTypes';


// Actions para recuperación de datos de estaciones

export const handleSelection = (target) => {
  return {
      type: types.SELECT_BUSCADOR_BICI_SKI,
      payload:{
        selected: target
      }
  };
}
