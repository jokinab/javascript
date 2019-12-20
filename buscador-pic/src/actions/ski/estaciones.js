import * as types from './actionTypes';
import ApiPic from './../../apiPic/apiPic';


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
        estacionesList: items.estacionesData
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
        if (response.estacionesData.length > 0) {
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
  return {
    type: types.SHOW_ERRORS,
    payload: { error }
  };
}

// Action para cuando se clicka sector

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

// Action para cuando se selecciona fecha de inicio

export const handleStartDateSelection = (date) => {
  return {
    type: types.START_DATE_SELECTION,
    payload: {
      selectedDate: date
    }
  }
}

// Action para cuando se selecciona fecha fin

export const handleEndDateSelection = (date) => {
  return {
    type: types.END_DATE_SELECTION,
    payload: {
      selectedDate: date
    }
  }
}

export const handleButtonClick = () => {
  return {
    type: types.SKY_SUBMIT_CLICK,
    payload: {
      
    }
  }
}