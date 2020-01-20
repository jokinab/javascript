import * as types from '../../actions/bici/actionTypes';

// Estado inicial de la aplicacion
const initialState = {
  UIX: {
    isNotAgencia: true,
    displayEstaciones: false,
    displaySectoresFromEstacion: '-1',
    selectedEstacionId: 0,
    isSectorSelected: false,
    placeholder: '', 
    selectedSector: -1,
    disabledDays: [],
    firstDayAvailable: '',
    sendData: false,
    showErrors: {
      show: false,
      showError1: false,
      showError2: false,
      showError3: false,
      showError4: false,
    },  
    startDatePicker: {
      selectedDate: '',
      isStartDateSelected: false
    },
    howManyDays: 1,
  },
  estaciones: {
    estacionesList: [],
    isFetchingEstaciones: false,
    isFetchingEstacionesErr: false
  }
  
};

// Reducer que devuelve el nuevo estado

export const buscadorBici = (state = initialState, action) => {
    
    let newUIX = {};
    let newStartDatePicker = {};
    let newErrors = {};

    switch (action.type) {
        case types.FETCH_ESTACIONES_ERROR_BICI:
          return {
            ...state,
            estaciones: {
              isFetchingEstacionesErr: action.payload.isFetchingEstacionesErr,
              isFetchingEstaciones: action.payload.isFetchingEstaciones,
              estacionesList: []
            }
          }
        case types.FETCH_ESTACIONES_LIST_BICI:
          return {
            ...state,
            estaciones: {
              isFetchingEstacionesErr: action.payload.isFetchingEstacionesErr,
              isFetchingEstaciones: action.payload.isFetchingEstaciones,
              estacionesList: []
            }  
          }
        case types.FETCH_ESTACIONES_SUCCESS_BICI:
          return {
            ...state,
            estaciones: {
              estacionesList: action.payload.estacionesList
            }  
          }
        case types.ESTACIONES_BUTTON_CLICK_BICI:
          newUIX = {
            ...state.UIX,
            displayEstaciones: !state.UIX.displayEstaciones,
            displaySectoresFromEstacion: '-1'
          }

          return {
            ...state,
            UIX: newUIX
          } 
        case types.ESTACION_CLICK_BICI:

          let bloquedDays = state.estaciones.estacionesList.find( (estacion) =>  estacion.estacionId === action.payload.estacionId).diasBloqueados;
          let firstDayAvailable = state.estaciones.estacionesList.find( (estacion) =>  estacion.estacionId === action.payload.estacionId).primerDiaLibre;

          newUIX = {}; 

          newStartDatePicker = {
            ...state.UIX.startDatePicker,
            selectedDate: new Date(firstDayAvailable)
          }          
          
          let estacion = state.estaciones.estacionesList.find(estacion => estacion.estacionId === action.payload.estacionId);
          newUIX = {
            ...state.UIX,
            selectedEstacionId: action.payload.estacionId,
            displayEstaciones: !state.UIX.displayEstaciones,
            placeholder: estacion.nombre,
            isSectorSelected: true,
            disabledDays: bloquedDays,
            firstDayAvailable: new Date(firstDayAvailable),
            startDatePicker: newStartDatePicker
          }          
          
          return { 
            ...state,
            UIX: newUIX
          }   
        
          case types.HIDE_ERRORS_BICI:
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
          
          case types.SHOW_ERRORS_BICI:
              newErrors = { 
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
          case types.SECTOR_CLICK_BICI:
              newStartDatePicker = {
                ...state.UIX.startDatePicker,
                isStartDateSelected: true
              }
              newUIX = {
                ...state.UIX,
                selectedSector: action.payload.selectedSector,
                placeholder: action.payload.placeholder,
                displayEstaciones: !state.UIX.displayEstaciones,
                isSectorSelected: true,
                startDatePicker: newStartDatePicker
              }    
              return {
                ...state,                
                UIX: newUIX
              }     
          case types.START_DATE_SELECTION_BICI:

            newStartDatePicker = {
              ...state.UIX.startDatePicker,
              selectedDate: action.payload.selectedDate,
              isStartDateSelected: true
            }
                      
            newUIX = {
              ...state.UIX,
              startDatePicker: newStartDatePicker,
            }
            return {
              ...state,
              UIX: newUIX
            }    
            
            case types.SKY_SUBMIT_CLICK_BICI: 
              
              newUIX = {
                ...state.UIX,
                showForfaitOverlay: false,
                sendData: true
              }
            
              return {
                ...state,
                UIX: newUIX
              }
            case types.CUANTOS_DIAS_SELECTION:
              newUIX = {
                ...state.UIX,
                howManyDays: action.payload.howManyDays
              }
              return {
                ...state,
                UIX: newUIX
              }    
                    
        default:
          return state;
    }
}