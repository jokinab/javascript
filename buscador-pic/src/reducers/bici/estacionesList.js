import * as types from '../../actions/bici/actionTypes';
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
    endDatePicker: {
      selectedDate: '',
    },
    howManyDays: 1,
    displayAvailableStores: false,
    showTiendasFrom: false
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
    let newEndDatePicker = {};
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

          if ( action.payload.hasSelectedData ) {
            
            let startDateArr = action.payload.fechaIni.split('-');
            let endDateArr = action.payload.fechaFin.split('-');
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
                selectedDate: new Date(startDateArr[0], parseInt(startDateArr[1])-1 < 0 ? '11' : (parseInt(startDateArr[1])-1).toString(), startDateArr[2]),
                isStartDateSelected: true
              },
              endDatePicker: {
                selectedDate:  new Date(endDateArr[0],parseInt(endDateArr[1])-1 < 0 ? '11' : (parseInt(endDateArr[1])-1).toString() ,endDateArr[2])
              },
              howManyDays: action.payload.howManyDays,
              selectedTienda: action.payload.selecetedTienda,
              placeholder: selectedEstacion.nombre
            }
            
          } else {
            newUIX = { 
              ...state.UIX,
              isNotAgencia: action.payload.isNotAgencia
            };
          }

          return {
            ...state,
            UIX: newUIX,
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

          let endDay = new Date(state.UIX.startDatePicker.selectedDate);
          endDay.setDate(endDay + state.UIX.howManyDays);

          if ( state.UIX.startDatePicker.isStartDateSelected && !DateTools.hasBloquedDaysInSelected( state.UIX.startDatePicker.selectedDate, endDay, bloquedDays ) ) {
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
            displayAvailableStores: true,
            showTiendasFrom: true
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

/*

const formatDateToString = ( date = new Date() ) => {
  
  let year = date.getFullYear();
  let month = date.getMonth();
  month = month + 1 > 12 ? 1 : month + 1;
  month = parseInt(month) < 10 ? '0'+month : month;
  let day = date.getDate();
  day = parseInt(day) < 10 ? '0'+day : day;

  return `${year}-${month}-${day}`;

}

const hasBloquedDaysInSelected = ( startDate, endDate, bloquedDays ) => {
  
  let hasBloquedDay = false;
  let day = new Date(startDate);
  day.setHours(0,0,0,0);
  let endDay = new Date(endDate);
  endDay.setHours(0,0,0,0);
  let firstLoop = true;

  do{
    
    if ( firstLoop ) {
      day.setDate(day.getDate()+0); 
      firstLoop = false;
    } else {
      day.setDate(day.getDate() + 1); 
    }
    
    if ( bloquedDays.includes(formatDateToString(day) ) ) {
      hasBloquedDay = true;
    }

  }while( day.getTime() < endDay.getTime() && !hasBloquedDay );
  
  if ( bloquedDays.includes(formatDateToString(endDay) ) ) {
    hasBloquedDay = true;
  }

  return hasBloquedDay;

}
*/