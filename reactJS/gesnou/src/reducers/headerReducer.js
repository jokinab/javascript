import * as types from './../actions/actionTypes';


const colors = ['red', 'yellow', 'blue', 'green']

// Estado inicial de la aplicacion
const initialState = {
  color: colors[0]
}

// Reducer que devuelve el nuevo estado
export const headerReducer = (state = initialState, action) => {
  console.log('color: ',state.color)
  switch (action.type) {
    case types.CHANGE_COLOR:
      return { color:  colors[Math.floor( (Math.random() * 5) + 1 )] }
    default:
      return state
  }
}
