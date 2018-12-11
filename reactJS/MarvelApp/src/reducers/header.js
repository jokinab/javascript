import * as types from './../actions/actionTypes';

// Estado inicial de la aplicacion
const initialState = {
  currentLanguage: 'es'
};

// Reducer que devuelve el nuevo estado
const header = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_LANGUAGE:
      return {
        currentLanguage: action.payload.lang
      }
    default:
      return state;
  }
};

export default header;
