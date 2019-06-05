import * as types from './../actions/actionTypes';

// Estado inicial de la aplicacion
const initialState = {
  counter: parseInt(0)
}

// Reducer que devuelve el nuevo estado
export const increaseCounter = (state = initialState, action) => {
    switch (action.type) {
        case types.INCREASE_COUNTER:
          return {
            counter: action.payload.counter
          }
        default:
            return state;
    }
}
