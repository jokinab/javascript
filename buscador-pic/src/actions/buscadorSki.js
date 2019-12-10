import * as types from './actionTypes';
import ApiPic from '../apiPic/apiPic';


export const fetchEstacionesList = (bool, error) => {
    return {
        type: types.FETCH_ESTACIONES_LIST,
        payload:{
          isFetchingEstaciones: true,
          isFetchingEstacionesErr: error,
          estacionesList: []
        }
    };
}


export const fetchEstacionesErr = (bool) => {
  return {
      type: types.FETCH_ESTACIONES_ERROR,
      payload:{
        isFetchingEstaciones: false,
        isFetchingEstacionesErr: bool,
        estacionesList: []
      }
  };
}


export const fetchEstacionesSuccess = (items) => {
  return {
      type: types.FETCH_ESTACIONES_SUCCESS,
      payload:{
        isFetchingEstaciones: false,
        isFetchingEstacionesErr: false,
        estacionesList: items
      }
  };
}


export const fetchEstacionesItems = () => {
  return (dispatch) => {
      ( async function(){
        dispatch(fetchEstacionesList(true, false));
        try {
          const estacionesList = await ApiPic.getEstacionesList();
          const response = await estacionesList.json();
          if (response.length > 0) {
            console.log(response)
            dispatch(fetchEstacionesSuccess(response));
          }else{
            dispatch(fetchEstacionesErr(true))            
          }
        } catch (error) {
          throw new Error(error);
          dispatch(fetchEstacionesErr(true));
        }
      })()
  }
}