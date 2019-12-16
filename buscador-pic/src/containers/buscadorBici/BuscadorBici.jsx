import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerPlaceHolder from './../../components/datePickerPlaceHolder/DatePickerPlaceHolder';

import { 
  fetchEstacionesItems, 
  handleEstacionesButtonClick, 
  handleEstacionClick,
  handleHideErrors,
  handleShowErrors,
  handleSectorClick,
  handleStartDateSelection,
  handleEndDateSelection 
} from '../../actions/estaciones';

import './BuscadorBici.css';

import EstacionesSectoresSelector from './../../components/estacionesSectoresSelector/EstacionesSectoresSelector';

const configBuscadorSki = {
  isNotAgencia: true,
  inputClass: 'input-buscador'
}

class BuscadorSkiComponent extends Component{
  constructor(...args){
    super(...args);
    this.handleEstacionSectorSelector = this.handleEstacionSectorSelector.bind(this);
    this.handleEstacionClick = this.handleEstacionClick.bind(this);
    this.handleSectorClick = this.handleSectorClick.bind(this);
    this.handleStartDateSelection = this.handleStartDateSelection.bind(this);
    this.handlePlaceHolderStartDayClik = this.handlePlaceHolderStartDayClik.bind(this);
    this.handlePlaceHolderEndDayClik = this.handlePlaceHolderEndDayClik.bind(this);
    this.handleEndDateSelection = this.handleEndDateSelection.bind(this);
  }

  handleEstacionSectorSelector(){
    this.hideErrors();
    this.props.onEstacionesButtonClick();
  }
    
  handleEstacionClick(target){
    this.hideErrors();
    this.props.onEstacionClick(target);
  }

  hideErrors(){
    if (this.props.UIX.showErrors) {
      this.props.onHideErrors();
    }  
  }

  handleSectorClick(e){
    this.hideErrors();
    this.props.onSectorClick(e);  
  }

  handlePlaceHolderStartDayClik(){
    this.hideErrors();
    this.props.onShowErrors({ show: true, showError1: true });
  }

  handleStartDateSelection(date){
    this.hideErrors();
    this.props.onStartDateSelection(date);  
  }

  handlePlaceHolderEndDayClik( isStartDateSelected = false ){ 
    let error = ( isStartDateSelected ) ? { show: true, showError1: false, showError2: true } : { show: true, showError1: true, showError2: true };
    this.props.onShowErrors(error);
  }  

  handleEndDateSelection(date){
    this.props.onEndDateSelection(date);
  }


  componentDidMount(){
    this.props.onFetchEstacionesItems();
  }

  render(){
    
    let UIX = this.props.UIX;
    let estacionesList = this.props.estaciones.estacionesList;

    return (
      <div className="buscador-container">
        
        { estacionesList.length <= 0 && 
          <div>Loading</div>
        }

        { estacionesList.length > 0 && 
          <div className="buscador-items">  
            <EstacionesSectoresSelector 
              placeholder={UIX.placeholder}
              isNotAgencia={UIX.isNotAgencia} 
              estacionesList={estacionesList}
              displaySectoresFromEstacion={UIX.displaySectoresFromEstacion}
              displayEstaciones={UIX.displayEstaciones}
              handleEstacionClick={this.handleEstacionClick} 
              handleSectorClick={this.handleSectorClick}
              handleEstacionSectorSelector={this.handleEstacionSectorSelector}
              classPlace={configBuscadorSki.inputClass} />
            
            { !UIX.isSectorSelected && 
              <DatePickerPlaceHolder 
                textPlace={UIX.startDatePicker.placeholder} 
                handlePlaceHolderClick={this.handlePlaceHolderStartDayClik} 
                classPlace={configBuscadorSki.inputClass} /> }
            
            { UIX.isSectorSelected &&   
              <DatePicker 
                dateFormat="dd-MM-yyyy"
                selected={UIX.startDatePicker.selectedDate}
                onChange={(date) => this.handleStartDateSelection(date)}
                className={configBuscadorSki.inputClass}
                excludeDates={UIX.disabledDays.map( date => new Date(date) )}
                minDate={new Date(UIX.firstDayAvailable)}
                maxDate={ ( UIX.endDatePicker.selectedDate === '' && 
                            UIX.endDatePicker.isEndDateSelected ) ? new Date('2050-12-12') : UIX.endDatePicker.selectedDate}
                />       
            }

            { ( !UIX.isSectorSelected || UIX.startDatePicker.selectedDate === '' ) && 
              <DatePickerPlaceHolder 
                textPlace={UIX.endDatePicker.placeholder} 
                handlePlaceHolderClick={ () =>this.handlePlaceHolderEndDayClik(UIX.startDatePicker.isStartDateSelected) } 
                classPlace={configBuscadorSki.inputClass} /> }
            
            { ( UIX.isSectorSelected && UIX.startDatePicker.selectedDate !== '' ) && 
              <DatePicker 
                dateFormat="dd-MM-yyyy"
                selected={ UIX.endDatePicker.selectedDate !== '' ? UIX.endDatePicker.selectedDate : UIX.startDatePicker.selectedDate}
                onChange={(endDate) => this.handleEndDateSelection(endDate)}
                className={configBuscadorSki.inputClass}
                excludeDates={UIX.disabledDays.map( date => new Date(date) )}
                minDate={new Date(UIX.startDatePicker.selectedDate)}
                />       
            }

          </div>    
        }
        { UIX.showErrors.show && 
          <div className='errors-wrap'>
            { UIX.showErrors.showError1 && <div className='error'>Seleccione primero Sector</div> }  
            { UIX.showErrors.showError2 && <div className='error'>Seleccione primero Fecha de Inicio</div> }  
          </div>
        }  
      </div>
    )
  }
}  

// Mapeamos el estado a las propiedades.
const mapStateToProps = (state) => {
  return {
    ...state.buscadorSki
  }
}

// Mapeamos las acciones a las propiedades.
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchEstacionesItems: () => dispatch(fetchEstacionesItems()),
    onEstacionesButtonClick: (e) => dispatch(handleEstacionesButtonClick(e)),
    onEstacionClick: (target) => dispatch(handleEstacionClick(target)),
    onHideErrors: () => dispatch(handleHideErrors()),
    onShowErrors: (error) => dispatch(handleShowErrors(error)),
    onSectorClick: (e) => dispatch(handleSectorClick(e)),
    onStartDateSelection: (date) => dispatch(handleStartDateSelection(date)),
    onEndDateSelection: (date) => dispatch(handleEndDateSelection(date))
  }
}


// Conectamos el Componente al storage
const BuscadorSki = connect(mapStateToProps, mapDispatchToProps)(BuscadorSkiComponent)

export default BuscadorSki;
