import * as types from './../actions/actionTypes';

// Estado inicial de la aplicacion
const initialState = {
  counter: 0
}

// Reducer que devuelve el nuevo estado
export const counterReducer = (state = initialState, action) => {
  console.log('counter: ',state.counter)
  switch (action.type) {
    case types.INCREASE_COUNTER:
      return { counter: state.counter + 1 }
    case types.DECREMENT_COUNTER:
      return { counter: state.counter - 1 }
    default:
      return state
  }
}
