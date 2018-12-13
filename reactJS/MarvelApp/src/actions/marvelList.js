import * as types from './actionTypes';

import ApiMarvel from './../apiMarvel/ApiMarvel';


export const fetchMarvelList = (bool) => {
    return {
        type: types.FETCH_MARVEL_LIST,
        payload:{
          isFetching: true,
          isFetchErr: bool,
          marvelItems: []
        }
    };
}


export const fetchMarvelErr = (bool) => {
    return {
        type: types.FETCH_MARVEL_ERROR,
        payload:{
          isFetching: false,
          isFetchErr: bool,
          marvelItems: []
        }
    };
}


export const fetchMarvelSuccess = (items) => {
    return {
        type: types.FETCH_MARVEL_SUCCESS,
        payload:{
          isFetching: false,
          isFetchErr: false,
          totalItems: items.data.total,
          marvelItems: items.data.results
        }
    };
}

export const fetchMarvelItems = (page) => {
    return (dispatch) => {
        ( async function(){
          dispatch(fetchMarvelList(true));
          try {
            const charactersMarvel = await ApiMarvel.getMarvelCharactersPage( page );
            const response = await charactersMarvel.json();
            if (response.status != 'Ok') {
              dispatch(fetchMarvelErr(true))
            }else{
              dispatch(fetchMarvelSuccess(response));
            }
          } catch (error) {
            throw new Error(error);
            dispatch(fetchMarvelErr(true));
          }
        })()
    }
}
