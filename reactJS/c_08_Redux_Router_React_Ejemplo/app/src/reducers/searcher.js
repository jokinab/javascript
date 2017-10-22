import * as types from './../actions/actionTypes';
import teachers from './../data/teachers';

// Estado inicial de la aplicacion
const initialState = {
  text: '',
  teachers: teachers
};

// Esta funcion devuelve un array de profesores con el filtro de texto aplicado
const filterTeachers = (filterText) => teachers.filter((element) => element.name.toLowerCase().search(filterText) !== -1);

// Reducer que devuelve el nuevo estado
const searcher = (state = initialState, action) => {
  switch (action.type) {
    case types.FILTER:
      return {
        text: action.payload.text,
        teachers: filterTeachers(action.payload.text.toLowerCase())
      };
    default:
      return state;
  }
};

export default searcher;
