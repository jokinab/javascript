import * as types from './actionTypes';
import ApiPic from '../apiPic/apiPic';


// Actions para recuperación de datos de estaciones

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
        dispatch(fetchEstacionesErr(true));
        throw new Error(error);
      }
    })()
  }
}



// Action del botón de mostrar/ocultar selector de Estaciones

export const handleEstacionesButtonClick = (e) => {
  return {
    type: types.ESTACIONES_BUTTON_CLICK,
    payload:{}
  };
}

// Action del cuando se selecciona una estación

export const handleEstacionClick = (target) => {
  
  return {
    type: types.ESTACION_CLICK,
    payload:{
      estacionId: target.value
    }
  };
}


// Action para ocultar los errores

export const handleHideErrors = () => {
  
  return {
    type: types.HIDE_ERRORS,
    payload:{}
  };
}

// Action para ocultar los errores

export const handleShowErrors = (error) => {
  console.log(error);
  return {
    type: types.SHOW_ERRORS,
    payload: { error }
  };
}


export const handleSectorClick = (e) => {
  return {
    type: types.SECTOR_CLICK,
    payload: {
      selectedSector: JSON.parse(e.target.value).id,
      placeholder: JSON.parse(e.target.value).nombre,
      isSectorSelected: true
    }
  }
}