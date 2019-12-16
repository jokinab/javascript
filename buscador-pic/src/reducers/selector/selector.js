import * as types from '../../actions/selector/actionTypes';

// Estado inicial de la aplicacion
const initialState = {
  selector: {
    selected: 'ski'
  }  
};

// Reducer que devuelve el nuevo estado

export const selector = (state = initialState, action) => {
    
    switch (action.type) {
        case types.SELECT_BUSCADOR_BICI_SKI:
          return {
            ...state,
            selected: action.payload.selected
          }
        default:
          return state;
    }
}

