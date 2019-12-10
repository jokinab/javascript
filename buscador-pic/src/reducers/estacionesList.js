import * as types from '../actions/actionTypes';

// Estado inicial de la aplicacion
const initialState = {
  estacionesList: [],
  isFetchingEstaciones: false,
  isFetchingEstacionesErr: false
};

// Reducer que devuelve el nuevo estado

export const buscadorSki = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_ESTACIONES_ERROR:
            return {
              isFetchingEstacionesErr: action.payload.isFetchingEstacionesErr,
              isFetchingEstaciones: action.payload.isFetchingEstaciones,
              estacionesList: []
        }
        case types.FETCH_ESTACIONES_LIST:
          return {
            isFetchingEstacionesErr: action.payload.isFetchingEstacionesErr,
            isFetchingEstaciones: action.payload.isFetchingEstaciones,
            estacionesList: []
        }
        case types.FETCH_ESTACIONES_SUCCESS:
          return {
            isFetchingEstacionesErr: action.payload.isFetchingEstacionesErr,
            isFetchingEstaciones: action.payload.isFetchingEstaciones,
            estacionesList: action.payload.estacionesList
        }
        default:
            return state;
    }
}