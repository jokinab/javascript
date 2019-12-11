import * as types from '../actions/actionTypes';

// Estado inicial de la aplicacion
const initialState = {
  UIX: {
    isNotAgencia: true, 
    displayEstaciones: false,
    displaySectoresFromEstacion: '-1',
    selectedEstacionId: 0,
    isSectorSelected: false,
    placeholder: 'Estaciones / Sectores',
    selectedSector: -1,
    disabledDays: [],
    showErrors: {
      show: false,
      showError1: false,
      showError2: false,
      showError3: false,
      showError4: false,
    }    
  },
  estaciones: {
    estacionesList: [],
    isFetchingEstaciones: false,
    isFetchingEstacionesErr: false
  }
  
};

// Reducer que devuelve el nuevo estado

export const buscadorSki = (state = initialState, action) => {
    
    let newUIX = {};

    switch (action.type) {
        case types.FETCH_ESTACIONES_ERROR:
          return {
            ...state,
            estaciones: {
              isFetchingEstacionesErr: action.payload.isFetchingEstacionesErr,
              isFetchingEstaciones: action.payload.isFetchingEstaciones,
              estacionesList: []
            }
          }
        case types.FETCH_ESTACIONES_LIST:
          return {
            ...state,
            estaciones: {
              isFetchingEstacionesErr: action.payload.isFetchingEstacionesErr,
              isFetchingEstaciones: action.payload.isFetchingEstaciones,
              estacionesList: []
            }  
          }
        case types.FETCH_ESTACIONES_SUCCESS:
          return {
            ...state,
            estaciones: {
              isFetchingEstacionesErr: action.payload.isFetchingEstacionesErr,
              isFetchingEstaciones: action.payload.isFetchingEstaciones,
              estacionesList: action.payload.estacionesList
            }  
          }
        case types.ESTACIONES_BUTTON_CLICK:
          newUIX = {
            ...state.UIX,
            displayEstaciones: !state.UIX.displayEstaciones,
            displaySectoresFromEstacion: '-1'
          }

          return {
            ...state,
            UIX: newUIX
          } 
        case types.ESTACION_CLICK:

          let bloquedDays = state.estaciones.estacionesList.find( (estacion) =>  estacion.estacionId === action.payload.estacionId).diasBloqueados;

          newUIX = {};

          if (state.UIX.isNotAgencia) {
            newUIX = {
              ...state.UIX,
              selectedEstacionId: action.payload.estacionId,
              displaySectoresFromEstacion: action.payload.estacionId === state.UIX.displaySectoresFromEstacion ? '-1' : action.payload.estacionId,
              disabledDays: bloquedDays
            }
          } else {
            let estacion = state.estaciones.estacionesList.find(estacion => estacion.estacionId === action.payload.estacionId);
            newUIX = {
              ...state.UIX,
              selectedEstacionId: action.payload.estacionId,
              displayEstaciones: !state.UIX.displayEstaciones,
              placeholder: estacion.nombre,
              isSectorSelected: true,
            }
          } 

          return { 
            ...state,
            UIX: newUIX
          }   
        
          case types.HIDE_ERRORS:
              newUIX = {
                ...state.UIX,
                showErrors: {
                  show: false,
                  showError1: false,
                  showError2: false,
                  showError3: false,
                  showError4: false,
                } 
              }
    
              return {
                ...state,
                UIX: newUIX
              }  
          
          case types.SHOW_ERRORS:
              let newErrors = { 
                ...state.UIX.showErrors,
                ...action.payload.error
              }
              newUIX = {
                ...state.UIX,
                showErrors: newErrors
              }
    
              return {
                ...state,
                UIX: newUIX
              }      
          case types.SECTOR_CLICK:
              newUIX = {
                ...state.UIX,
                selectedSector: action.payload.selectedSector,
                placeholder: action.payload.placeholder,
                displayEstaciones: !state.UIX.displayEstaciones,
                isSectorSelected: true,
              }    
              return {
                ...state,                
                UIX: newUIX
              }       
        default:
          return state;
    }
}