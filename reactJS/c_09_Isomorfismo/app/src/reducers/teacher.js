import * as types from './../actions/actionTypes';
import teachers from './../data/teachers';

// Reducer que devuelve el nuevo estado
const teacher = (state = {}, action) => {
  switch (action.type) {
    case types.REQUEST_TEACHER:
      // con reduce(t => t) devolvemos un ojeto en vez del array 
      console.log(teachers.filter((element) => element.id === action.payload.id).reduce(t => t));
      return teachers.filter((element) => element.id === action.payload.id).reduce(t => t);
    default:
      return state;
  }
};

export default teacher;
