import * as types from '../../actions/ski/actionTypes';
import { LangsString } from './../../lang/Lang';

// Estado inicial de la aplicacion
const initialState = {
  UIX: {
    isNotAgencia: true,
    displayEstaciones: false,
    displaySectoresFromEstacion: '-1',
    selectedEstacionId: 0,
    isSectorSelected: false,
    placeholder: LangsString.skiSelector.es, // corregir para que sea dinamico
    placeholderSubmit: 'Enviar',
    selectedSector: -1,
    disabledDays: [],
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
      placeholder: 'Selecciona Fecha de Inicio',
      selectedDate: '',
      isStartDateSelected: false
    },
    endDatePicker: {
      placeholder: 'Selecciona Fecha de Entrega',
      selectedDate: ''
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
    let newStartDatePicker = {};
    let newEndDatePicker = {};
    let newErrors = {};

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
          let firstDayAvailable = state.estaciones.estacionesList.find( (estacion) =>  estacion.estacionId === action.payload.estacionId).primerDiaLibre;

          newUIX = {}; 

          newStartDatePicker = {
            ...state.UIX.startDatePicker,
            selectedDate: new Date(firstDayAvailable)
          }
          
          if (state.UIX.isNotAgencia) {
            newUIX = {
              ...state.UIX,
              selectedEstacionId: action.payload.estacionId,
              displaySectoresFromEstacion: action.payload.estacionId === state.UIX.displaySectoresFromEstacion ? '-1' : action.payload.estacionId,
              disabledDays: bloquedDays,
              firstDayAvailable: firstDayAvailable,
              startDatePicker: newStartDatePicker
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
              startDatePicker: newStartDatePicker
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
          case types.SECTOR_CLICK:
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
          case types.START_DATE_SELECTION:

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
            case types.END_DATE_SELECTION:
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
            case types.SKY_SUBMIT_CLICK: 
              if (displayForfaitOverlay(state.UIX.startDatePicker.selectedDate)) {
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

/* // Mirar si las condiciones de hora de reserva son necesarias
// Devuelve el dia de posible alquiler dependiendo si es agencia o no, teniendo en cuenta las horas limites de reserva y el primer dia disponible dado por el servidor

const getStartDate = ( isNotAgencia = true, firstDayAvailable ) => {

  // Miramos primero si es agencia para comparar con las horas limite de reserva. 
  // Para agencia, si es antes de las 13:00 se puede reservar el mismo dia
  // Para quien no es agencia, si se reserva antes de las 07:00, se puede reservar el mismo dia. 
  // En caso contrario, el primer deia disponible sera el dia siguiente

  let today = new Date();
  let currentHour = today.getHours();

  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  let availableDayByBookingHour = ''; 
  console.log('hora', currentHour);
  if (isNotAgencia) {
    availableDayByBookingHour = currentHour < 20 ? formatDateToString(today) : formatDateToString(tomorrow);
  } else {
    availableDayByBookingHour = currentHour < 13 ? formatDateToString(today) : formatDateToString(tomorrow);
  }
  console.log(availableDayByBookingHour)
  // Comparamos el dia calculado con el primer dia disponible calculado en el servidor.
  // Si el que hemos calculado nosotros es mayor que el del servidor, devolvemos el nuestro, si no, el suyo

  let availableFirstDayDate = new Date(`${firstDayAvailable}T00:00:00Z`);
  let availableDayByBookingHourDate = new Date(`${availableDayByBookingHour}T00:00:00Z`);

  console.log(availableDayByBookingHourDate.getTime())
  console.log(availableFirstDayDate.getTime())
    
  return  availableDayByBookingHourDate.getTime() > availableFirstDayDate.getTime() ? availableDayByBookingHour : availableDayByBookingHour;

}
*/

/*
const formatDateToString = ( date = new Date() ) => {
  
  let year = date.getFullYear();
  let month = date.getMonth();
  month = month + 1 > 12 ? 1 : month + 1;
  let day = date.getDate();

  return `${year}-${month}-${day}`;

}
*/

