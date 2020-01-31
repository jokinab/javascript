import * as types from '../../actions/ski/actionTypes';
import DateTools from './../../lib/dateTools';

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
    selecetedTienda: -1,
    firstDayAvailable: '',
    showForfaitOverlay: false,
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
    endDatePicker: {
      selectedDate: ''
    },
    hasForfaitSelected: false,
    noForfaitStation: '-1'
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
    let newStartDatePicker = {};
    let newEndDatePicker = {};
    let newErrors = {};

    switch (action.type) {
        case types.FETCH_ESTACIONES_ERROR_SKI:
          return {
            ...state,
            estaciones: {
              isFetchingEstacionesErr: action.payload.isFetchingEstacionesErr,
              isFetchingEstaciones: action.payload.isFetchingEstaciones,
              estacionesList: []
            }
          }
        case types.FETCH_ESTACIONES_LIST_SKI:
          return {
            ...state,
            estaciones: {
              isFetchingEstacionesErr: action.payload.isFetchingEstacionesErr,
              isFetchingEstaciones: action.payload.isFetchingEstaciones,
              estacionesList: []
            }  
          }
        case types.FETCH_ESTACIONES_SUCCESS_SKI:
          
          if ( action.payload.hasSelectedData ) {
            let startDateArr = action.payload.fechaIni.split('-');
            let endDateArr = action.payload.fechaFin.split('-');
            let selectedEstacion = action.payload.estacionesList.find( estacion => estacion.sectores.find( sector => sector.id === action.payload.sectorId) );
            newUIX = {
              ...state.UIX,
              isNotAgencia: action.payload.isNotAgencia,
              isSectorSelected: true,
              selectedEstacionId: selectedEstacion.estacionId,
              disabledDays: selectedEstacion.diasBloqueados,
              selectedSector: action.payload.sectorId,
              startDatePicker: {
                selectedDate: new Date(startDateArr[0], parseInt(startDateArr[1])-1 < 0 ? '11' : (parseInt(startDateArr[1])-1).toString(), startDateArr[2]),
                isStartDateSelected: true
              },
              endDatePicker: {
                selectedDate:  new Date(endDateArr[0],parseInt(endDateArr[1])-1 < 0 ? '11' : (parseInt(endDateArr[1])-1).toString() ,endDateArr[2])
              },
              selectedTienda: action.payload.selecetedTienda,
              placeholder: selectedEstacion.sectores.find( sector => sector.id === action.payload.sectorId).nombre,
              hasForfaitSelected: action.payload.hasForfaitSelected ? true : false,
              hasSelectedData: action.payload.hasSelectedData
            }
            
          } else {
            newUIX = { 
              ...state.UIX,
              isNotAgencia: action.payload.isNotAgencia,
              hasSelectedData: action.payload.hasSelectedData
            };
          }
          
          return {
            ...state,
            UIX: newUIX,
            estaciones: {
              estacionesList: action.payload.estacionesList
            }  
          }
        case types.ESTACIONES_BUTTON_CLICK_SKI:
          newUIX = {
            ...state.UIX,
            displayEstaciones: !state.UIX.displayEstaciones,
            displaySectoresFromEstacion: '-1'
          }

          return {
            ...state,
            UIX: newUIX
          } 
        case types.ESTACION_CLICK_SKI:

          let bloquedDays = state.estaciones.estacionesList.find( (estacion) =>  estacion.estacionId === action.payload.estacionId).diasBloqueados;
          let firstDayAvailable = state.estaciones.estacionesList.find( (estacion) =>  estacion.estacionId === action.payload.estacionId).primerDiaLibre;

          newUIX = {}; 

          if ( state.UIX.startDatePicker.isStartDateSelected && !DateTools.hasBloquedDaysInSelected( state.UIX.startDatePicker.selectedDate, state.UIX.endDatePicker.selectedDate, bloquedDays ) ) {
            newStartDatePicker = {
              ...state.UIX.startDatePicker,
            } 
            newEndDatePicker = {
              ...state.UIX.endDatePicker,
            }  
          } else {
            newStartDatePicker = {
              ...state.UIX.startDatePicker,
              selectedDate: new Date(firstDayAvailable)
            }
            newEndDatePicker = {
              ...state.UIX.endDatePicker,
              selectedDate: new Date(firstDayAvailable)
            }
          }          
          
          if (state.UIX.isNotAgencia) {
            newUIX = {
              ...state.UIX,
              selectedEstacionId: action.payload.estacionId,
              displaySectoresFromEstacion: action.payload.estacionId === state.UIX.displaySectoresFromEstacion ? '-1' : action.payload.estacionId,
              disabledDays: bloquedDays,
              firstDayAvailable: firstDayAvailable,
              startDatePicker: newStartDatePicker,
              endDatePicker: newEndDatePicker,
              hasForfaitSelected: state.UIX.showChangeToNoForfaitOverlay ? false : state.UIX.hasForfaitSelected,
              showChangeToNoForfaitOverlay: false
            }
          } else {
            let estacion = state.estaciones.estacionesList.find(estacion => estacion.estacionId === action.payload.estacionId);
            newUIX = {
              ...state.UIX,
              selectedEstacionId: action.payload.estacionId,
              displayEstaciones: !state.UIX.displayEstaciones,
              placeholder: estacion.nombre,
              isSectorSelected: true,
              disabledDays: bloquedDays,
              firstDayAvailable: new Date(firstDayAvailable),
              startDatePicker: newStartDatePicker,
              endDatePicker: newEndDatePicker,
              hasForfaitSelected: state.UIX.showChangeToNoForfaitOverlay ? false : state.UIX.hasForfaitSelected,
              showChangeToNoForfaitOverlay: false
            }
          } 
          
          return { 
            ...state,
            UIX: newUIX
          }   
        
          case types.HIDE_ERRORS_SKI:
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
          
          case types.SHOW_ERRORS_SKI:
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
          case types.SECTOR_CLICK_SKI:
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
          case types.START_DATE_SELECTION_SKI:

            newStartDatePicker = {
              ...state.UIX.startDatePicker,
              selectedDate: action.payload.selectedDate,
              isStartDateSelected: true
            }
            newEndDatePicker = {
              ...state.UIX.endDatePicker,
              selectedDate: state.UIX.endDatePicker.selectedDate === '' ? action.payload.selectedDate: state.UIX.endDatePicker.selectedDate,
            }            
            newUIX = {
              ...state.UIX,
              startDatePicker: newStartDatePicker,
              endDatePicker: newEndDatePicker,
            }
            return {
              ...state,
              UIX: newUIX
            }    
            case types.END_DATE_SELECTION_SKI:
              newEndDatePicker = {
                ...state.UIX.EndDatePicker,
                selectedDate: action.payload.selectedDate,
                isEndDateSelected: true
              }
              newUIX = {
                ...state.UIX,
                endDatePicker: newEndDatePicker
              }
              return {
                ...state,
                UIX: newUIX
              }  
            case types.SKY_SUBMIT_CLICK_SKI: 
              if ( state.estaciones.estacionesList.find( estacion => estacion.estacionId === state.UIX.selectedEstacionId ).sectores[0].forfait === 1  && 
                   displayForfaitOverlay(state.UIX.startDatePicker.selectedDate) ) {
                newUIX = {
                  ...state.UIX,
                  showForfaitOverlay: true,
                  sendData: false
                }
              } else {
                newUIX = {
                  ...state.UIX,
                  showForfaitOverlay: false,
                  sendData: true
                }
              }
              return {
                ...state,
                UIX: newUIX
              }
            case types.FORFAIT_BUTTON_CLICK_SKI:
              newUIX = {
                ...state.UIX,
                hasForfaitSelected: action.payload.hasForfaitSelected 
              }
              return {
                ...state, 
                UIX: newUIX
              }    
            case types.CHANGE_TO_NO_FORFAIT_STATION_OVERLAY:
              newUIX = {
                ...state.UIX,
                showChangeToNoForfaitOverlay: action.payload.showChangeToNoForfaitOverlay,
                noForfaitStation: action.payload.noForfaitStation
              }
              return {
                ...state,
                UIX: newUIX
              }        
        default:
          return state;
    }
}


const displayForfaitOverlay = (selectedDate) => {
  
  let selectedDay = new Date(selectedDate);
  let inTwoDays = new Date();
  inTwoDays.setDate(inTwoDays.getDate() + 2);
  inTwoDays.setHours(0,0,0,0);
  
  return selectedDay.getTime() >= inTwoDays.getTime() ? true : false;
}