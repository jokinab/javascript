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
    selectedTienda: -1,
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
      selectedDate: '',
      isStartDateSelected: false
    },
    hasForfaitSelected: false,
    hasRopaSelected: false,
    showChangeToNoMaterialSectorOverlay: false,
    noMaterialSector: '-1',
    linkToCesta: ''
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
            
            let selectedEstacion = action.payload.estacionesList.find( estacion => estacion.sectores.find( sector => sector.id === action.payload.sectorId) );
            let firstDayAvailable = action.payload.estacionesList.find( (estacion) =>  estacion.estacionId === selectedEstacion.estacionId ).primerDiaLibre;
            
            newUIX = {
              ...state.UIX,
              isNotAgencia: action.payload.isNotAgencia,
              isSectorSelected: true,
              selectedEstacionId: selectedEstacion.estacionId,
              disabledDays: selectedEstacion.diasBloqueados,
              firstDayAvailable: firstDayAvailable,
              selectedSector: action.payload.sectorId,
              startDatePicker: {
                selectedDate: DateTools.formatStringToDate(action.payload.fechaIni),
                isStartDateSelected: true
              },
              endDatePicker: {
                selectedDate:  DateTools.formatStringToDate(action.payload.fechaFin)
              },
              selectedTienda: action.payload.selecetedTienda,
              placeholder: selectedEstacion.sectores.find( sector => sector.id === action.payload.sectorId).nombre,
              hasForfaitSelected: action.payload.hasForfaitSelected ? true : false,
              hasRopaSelected: action.payload.hasRopaSelected ? true : false,
              hasSelectedData: action.payload.hasSelectedData,
              linkToCesta: action.payload.linkToCesta,
              marquee: action.payload.marquee

            }
            
          } else {
            newUIX = { 
              ...state.UIX,
              isNotAgencia: action.payload.isNotAgencia,
              hasSelectedData: action.payload.hasSelectedData,
              marquee: action.payload.marquee
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
              // selectedDate: new Date(firstDayAvailable)
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
              showChangeToNoForfaitOverlay: false,
              showChangeToNoRopaOverlay: false
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
              showChangeToNoForfaitOverlay: false,
              showChangeToNoRopaOverlay: false
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
                isStartDateSelected: true,
                showChangeToNoMaterialSectorOverlay: false
              }
              newUIX = {
                ...state.UIX,
                selectedSector: action.payload.selectedSector,
                placeholder: action.payload.placeholder,
                displayEstaciones: !state.UIX.displayEstaciones,
                isSectorSelected: true,
                startDatePicker: newStartDatePicker,
                showChangeToNoMaterialSectorOverlay: false
              }    
              return {
                ...state,                
                UIX: newUIX
              }     
          case types.START_DATE_SELECTION_SKI:
            
            let selectedStartDate = new Date(action.payload.selectedDate);
            let selectedEndDate = new Date(state.UIX.endDatePicker.selectedDate === '' ? action.payload.selectedDate: state.UIX.endDatePicker.selectedDate);
            
            if ( selectedEndDate.getTime() < selectedStartDate.getTime() ) {
              selectedEndDate = selectedStartDate;
            }
            
            newStartDatePicker = {
              ...state.UIX.startDatePicker,
              selectedDate: action.payload.selectedDate,
              isStartDateSelected: true
            }
            newEndDatePicker = {
              ...state.UIX.endDatePicker,
              selectedDate: selectedEndDate,
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

              const estacion = state.estaciones.estacionesList.find( estacion => estacion.sectores.find( sector => sector.id === state.UIX.selectedSector) );
              const sector = estacion.sectores.find( sector => sector.id === state.UIX.selectedSector);  

              if ( 
                  state.UIX.isNotAgencia && 
                  sector.forfait === 1 && 
                  DateTools.isInDateToSelectForfait( state.UIX.startDatePicker.selectedDate, state.UIX.endDatePicker.selectedDate, parseInt(sector.maxDiasForfait) ) &&
                  DateTools.isMoreThanOneDayRent(state.UIX.startDatePicker.selectedDate, state.UIX.endDatePicker.selectedDate) 
              ) {
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
                hasForfaitSelected: action.payload.hasForfaitSelected,
                sendData:true
              }
              return {
                ...state, 
                UIX: newUIX
              }    
            /*  
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
            case types.CLOSE_TO_NO_FORFAIT_STATION_OVERLAY:
              newUIX = {
                ...state.UIX,
                showChangeToNoForfaitOverlay: false,
                displaySectoresFromEstacion: '-1',
                displayEstaciones: false
              }
              return {
                ...state,
                UIX: newUIX
              }  
            */  
            case types.CHANGE_TO_NO_MATERIAL_SECTOR_OVERLAY:
              newUIX = {
                ...state.UIX,
                showChangeToNoMaterialSectorOverlay: action.payload.showChangeToNoMaterialOverlay,
                noMaterialSector: action.payload.noMaterialSector
              }
              return {
                ...state,
                UIX: newUIX
              }    
            case types.CLOSE_TO_NO_MATERIAL_OVERLAY:
              newUIX = {
                ...state.UIX,
                showChangeToNoMaterialOverlay: false,
                displaySectoresFromEstacion: '-1',
                displayEstaciones: false
              }    
              return {
                ...state,
                UIX: newUIX
              }   
        default:
          return state;
    }
}