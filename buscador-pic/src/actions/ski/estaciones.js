import * as types from './actionTypes';
import ApiPic from './../../apiPic/apiPic';


// Actions para recuperación de datos de estaciones
export const fetchEstacionesList = (bool, error) => {
  return {
      type: types.FETCH_ESTACIONES_LIST_SKI,
      payload:{
        isFetchingEstaciones: true,
        isFetchingEstacionesErr: error,
        estacionesList: []
      }
  };
}


export const fetchEstacionesErr = (bool) => {
  return {
      type: types.FETCH_ESTACIONES_ERROR_SKI,
      payload:{
        isFetchingEstaciones: false,
        isFetchingEstacionesErr: bool,
        estacionesList: []  
      }
  };
}


export const fetchEstacionesSuccess = (items) => {
  
  let data = {};
  
  if ( items.hasSelectedData === true || items.hasSelectedData === "true" ) {
    data = {
      sectorId: items.sectorId,
      fechaIni: items.fechaIni,
      fechaFin: items.fechaFin,
      selecetedTienda: items.tiendaId,
      estacionesList: items.estacionesData,
      hasSelectedData: true,
      isNotAgencia: items.isNotAgencia,
      hasForfaitSelected: items.hasForfaitSelected,
      linkToCesta: items.linkToCesta,
      marquee: items.marquee
    }
  } else {
    data = {
      estacionesList: items.estacionesData,
      hasSelectedData: false,
      isNotAgencia: items.isNotAgencia,
      linkToCesta: items.linkToCesta,
      marquee: items.marquee
    }
  }
  return {
      type: types.FETCH_ESTACIONES_SUCCESS_SKI,
      payload: data
  };
}


export const fetchEstacionesItems = () => {
  return (dispatch) => {
    ( async function(){
      dispatch(fetchEstacionesList(true, false));
      try {
        const estacionesList = await ApiPic.getSkiEstacionesList();
        const response = await estacionesList.json();
        console.log(response)
        if (response.estacionesData.length > 0) {
          // console.log('Entra en el success', JSON.stringify(response));
          dispatch(fetchEstacionesSuccess(response));
        }else{
          // console.log('length de estaciones data es 0');
          dispatch(fetchEstacionesErr(true))            
        }
      } catch (error) {
        // console.log('falla el try');
        dispatch(fetchEstacionesErr(true));
        throw new Error(error);
      }
    })()
  }
}

// Action del botón de mostrar/ocultar selector de Estaciones
export const handleEstacionesButtonClick = (e) => {
  return {
    type: types.ESTACIONES_BUTTON_CLICK_SKI,
    payload:{}
  };
}

// Action del cuando se selecciona una estación
export const handleEstacionClick = (target) => {
  return {
    type: types.ESTACION_CLICK_SKI,
    payload:{
      estacionId: target.value
    }
  };
}

// Action para ocultar los errores
export const handleHideErrors = () => {
  return {
    type: types.HIDE_ERRORS_SKI,
    payload:{}
  };
}

// Action para ocultar los errores
export const handleShowErrors = (error) => {
  return {
    type: types.SHOW_ERRORS_SKI,
    payload: { error }
  };
}

// Action para cuando se clicka sector
export const handleSectorClick = (e) => {
  return {
    type: types.SECTOR_CLICK_SKI,
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
    type: types.START_DATE_SELECTION_SKI,
    payload: {
      selectedDate: date
    }
  }
}

// Action para cuando se selecciona fecha fin
export const handleEndDateSelection = (date) => {
  return {
    type: types.END_DATE_SELECTION_SKI,
    payload: {
      selectedDate: date
    }
  }
}

export const handleButtonClick = () => {
  return {
    type: types.SKY_SUBMIT_CLICK_SKI,
    payload: {}
  }
}

export const handleForfaitButtonClick = ( hasForfaitSelected = false ) => {
  return {
    type: types.FORFAIT_BUTTON_CLICK_SKI,
    payload: {
      hasForfaitSelected: ( hasForfaitSelected === 'true' || hasForfaitSelected === true ) ? true : false
    }
  }
}

export const changeToNoForfaitStation = (target) => {
  return {
    type: types.CHANGE_TO_NO_FORFAIT_STATION_OVERLAY,
    payload: {
      showChangeToNoForfaitOverlay: true,
      noForfaitStation: target.value 
    }
  }    
}

export const closeChangeStationOverlay = () => {
  return {
    type: types.CLOSE_TO_NO_FORFAIT_STATION_OVERLAY,
    payload: {}
  }    
}
