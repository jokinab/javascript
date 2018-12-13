import * as types from './../actions/actionTypes';

// Estado inicial de la aplicacion
const initialState = {
  marvelItems: [],
  isFetching: false,
  isFetchErr: false
};

// Reducer que devuelve el nuevo estado

export const fetchMarvelItems = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_MARVEL_ERROR:
            return {
              isFetchErr: action.payload.isFetchErr,
              ifFetching: action.payload.isFetching,
              marvelItems: []
        }
        case types.FETCH_MARVEL_LIST:
          return {
            isFetchErr: action.payload.isFetchErr,
            ifFetching: action.payload.isFetching,
            marvelItems: []
        }
        case types.FETCH_MARVEL_SUCCESS:
          return {
            isFetchErr: action.payload.isFetchErr,
            ifFetching: action.payload.isFetching,
            totalItems: action.payload.totalItems,
            marvelItems: action.payload.marvelItems
        }
        default:
            return state;
    }
}
