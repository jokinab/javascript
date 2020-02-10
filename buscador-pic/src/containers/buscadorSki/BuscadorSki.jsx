import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerPlaceHolder from '../../components/datePickerPlaceHolder/DatePickerPlaceHolder';
import { LangsString } from './../../lang/Lang';
import MensajeBuscadorItem from './../../components/mensajeBuscadorItem/MensajeBuscadorItem';
// get our fontawesome imports
import { faMapMarkerAlt, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from './../../components/loading/Loading';
import ChangeToNoForfaitOverlay from './../../components/changeToNoForfaitOverlay/ChangeToNoForfaitOverlay';
import DateTools from './../../lib/dateTools';
import ApiPic from './../../apiPic/apiPic';
import Marquee from './../../components/marquee/Marquee';

import { 
  fetchEstacionesItems, 
  handleEstacionesButtonClick, 
  handleEstacionClick,
  handleHideErrors,
  handleShowErrors,
  handleSectorClick,
  handleStartDateSelection,
  handleEndDateSelection,
  handleButtonClick,
  handleForfaitButtonClick,
  changeToNoForfaitStation,
  closeChangeStationOverlay
} from './../../actions/ski/estaciones';

import EstacionesSectoresSelector from '../../components/estacionesSectoresSelector/EstacionesSectoresSelector';
import ForfaitOverlay from '../../components/forfaitOverlay/ForfaitOverlay';

const configBuscadorSki = {
  isNotAgencia: true,
  inputClass: 'input-buscador'
}

class BuscadorSkiComponent extends Component{
  constructor(...args){
    super(...args);
    this.state = {};
    this.handleEstacionSectorSelector = this.handleEstacionSectorSelector.bind(this);
    this.handleEstacionClick = this.handleEstacionClick.bind(this);
    this.handleSectorClick = this.handleSectorClick.bind(this);
    this.handleStartDateSelection = this.handleStartDateSelection.bind(this);
    this.handlePlaceHolderStartDayClik = this.handlePlaceHolderStartDayClik.bind(this);
    this.handlePlaceHolderEndDayClik = this.handlePlaceHolderEndDayClik.bind(this);
    this.handleEndDateSelection = this.handleEndDateSelection.bind(this);
    this.handlePlaceHolderSubmit = this.handlePlaceHolderSubmit.bind(this);
    this.handleForfaitButtonCLick = this.handleForfaitButtonCLick.bind(this);
    this.handleTonoForfaitStationOverlayCLick = this.handleTonoForfaitStationOverlayCLick.bind(this);
  }

  handleEstacionSectorSelector(){
    this.hideErrors();
    this.props.onEstacionesButtonClick();
  }
    
  handleEstacionClick(target){
    
    this.hideErrors();
    
    // Miramos si tenia forfait seleccionado y si la nueva estacion seleccionada no tiene forfait
    if ( this.props.UIX.hasForfaitSelected && this.props.estaciones.estacionesList.find( estacion => estacion.estacionId === target.value ).sectores[0].forfait === 0 && this.props.UIX.isNotAgencia ) {
      this.props.onChangeToNoForfaitStation(target);
    } else {
      this.props.onEstacionClick(target);
    }

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
    this.hideErrors();
    let error = ( isStartDateSelected ) ? { show: true, showError1: false, showError2: true } : { show: true, showError1: true, showError2: true };
    this.props.onShowErrors(error);
  }  

  handleEndDateSelection(date){
    this.hideErrors();
    this.props.onEndDateSelection(date);
  }

  handlePlaceHolderSubmit(isStartDateSelected = false) {
    this.hideErrors();
    let error = ( isStartDateSelected ) ? { show: true, showError1: false, showError2: true } : { show: true, showError1: true, showError2: true, showError3: true };
    this.props.onShowErrors(error);
  }

  handleForfaitButtonCLick(e){
    this.props.onForfaitButtonClick(e.target.value);
  }

  handleTonoForfaitStationOverlayCLick(e){

    if ( e.target.value === 'true' ) {
      let data = {};
      data.value = this.props.UIX.noForfaitStation; 
      this.props.onEstacionClick(data);
    } else {
      this.props.onCloseChangeStationOverlay();
    }
  }

  componentDidMount(){
    this.hideErrors();
    if (! this.props.estaciones.estacionesList.length > 0 )
      this.props.onFetchEstacionesItems(this.props.isNotAgencia);
  }

  static getDerivedStateFromProps(nextProps, prevState){
    
    const datePickers = document.getElementsByClassName("react-datepicker__input-container");
    Array.from(datePickers).forEach((el => el.childNodes[0].setAttribute("readOnly", true)))
    // console.log(datePickers);

    if (nextProps.UIX.sendData) {

      let dataToSend = {};
      let fechaFin = nextProps.UIX.endDatePicker.selectedDate === '' ? 
                      DateTools.formatDateToString(nextProps.UIX.startDatePicker.selectedDate, 'es') : 
                      DateTools.formatDateToString(nextProps.UIX.endDatePicker.selectedDate, 'es');
      
      if ( nextProps.UIX.isNotAgencia ) {

        const estacion = nextProps.estaciones.estacionesList.find( estacion => estacion.sectores.find( sector => sector.id === nextProps.UIX.selectedSector) );
        const sector = estacion.sectores.find( sector => sector.id === nextProps.UIX.selectedSector);
        const tienda = ( sector.tiendas.find( tienda => tienda.id ===  nextProps.UIX.selectedTienda ) === undefined ) ? sector.tiendas[0].id : nextProps.UIX.selectedTienda;
        
        dataToSend = {
          fecha_inicio: DateTools.formatDateToString(nextProps.UIX.startDatePicker.selectedDate, 'es'),
          fecha_fin: fechaFin,
          sector_id: nextProps.UIX.selectedSector,
          store_id: tienda, // poner la primera tienda del sector elegido
          estacionId: estacion.estacionId,
          forfait_select: ( nextProps.UIX.hasForfaitSelected === "true" || nextProps.UIX.hasForfaitSelected === true ) ? true : false
        };

      } else {

        const estacion = nextProps.estaciones.estacionesList.find( estacion => estacion.estacionId === nextProps.UIX.selectedEstacionId);
        const sector = estacion.sectores[0];
        const tienda = sector.tiendas[0];
        
        dataToSend = {
          fecha_inicio: DateTools.formatDateToString(nextProps.UIX.startDatePicker.selectedDate, 'es'),
          fecha_fin: DateTools.formatDateToString(nextProps.UIX.endDatePicker.selectedDate, 'es'),
          sector_id: sector.id,
          store_id: tienda.id, // poner la primera tienda del sector elegido
          estacionId: estacion.estacionId,
          forfait_select: false
        };

      }  

      ApiPic.sendSkiData(dataToSend);

    }

    return null;
  }

  render(){
    
    let UIX = this.props.UIX;
    let lang = this.props.lang;
    let estacionesList = this.props.estaciones.estacionesList;
    
    return (
      <div className="buscador-container">
        
        { estacionesList.length <= 0 && 
          <Loading />
        }
        
        { estacionesList.length > 0 && <MensajeBuscadorItem title={LangsString.skiTitle[lang]} subtitle={LangsString.skiSubTitle[lang]} /> }
        
        { estacionesList.length > 0 && 
          <div className="buscador-items">  
            <div className='buscador-item'>
              <div className='icon-input-wrap'> 
                <EstacionesSectoresSelector 
                  placeholder={ UIX.placeholder === '' ? LangsString.skiSelector[lang] : UIX.placeholder }
                  isNotAgencia={UIX.isNotAgencia} 
                  estacionesList={estacionesList}
                  displaySectoresFromEstacion={UIX.displaySectoresFromEstacion}
                  displayEstaciones={UIX.displayEstaciones}
                  handleEstacionClick={this.handleEstacionClick} 
                  handleSectorClick={this.handleSectorClick}
                  handleEstacionSectorSelector={this.handleEstacionSectorSelector}
                  classPlace={configBuscadorSki.inputClass} />
                { !UIX.isSectorSelected && 
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                }  
                </div>  
            </div>
                
            <div className='buscador-item'>
              <div className='icon-input-wrap'> 
                { !UIX.isSectorSelected && 
                  <DatePickerPlaceHolder 
                    textPlace={LangsString.fechaInicio[lang]} 
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
                    //maxDate={ ( UIX.endDatePicker.selectedDate === '' && UIX.endDatePicker.isEndDateSelected ) ? new Date('2050-12-12') : UIX.endDatePicker.selectedDate}
                    />       
                }
                <FontAwesomeIcon icon={faCalendarAlt} />
              </div>  
            </div>  

            <div className='buscador-item'>
              <div className='icon-input-wrap'>   
                { ( !UIX.isSectorSelected || UIX.startDatePicker.selectedDate === '' ) && 
                  <DatePickerPlaceHolder 
                    textPlace={LangsString.fechaFin[lang]} 
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
                <FontAwesomeIcon icon={faCalendarAlt} />
              </div>  
            </div>  
            <div className='buscador-item'>    
              { ( !UIX.isSectorSelected || UIX.startDatePicker.selectedDate === '' ) && 
                <DatePickerPlaceHolder 
                  textPlace={LangsString.alquilar[lang]}
                  handlePlaceHolderClick={ () =>this.handlePlaceHolderSubmit(UIX.startDatePicker.isStartDateSelected) } 
                  classPlace='submit-button' /> }

              { ( UIX.isSectorSelected && UIX.startDatePicker.selectedDate !== '' ) &&    
                <button onClick={ () => this.props.onButtonClick() } className='submit-button' >{LangsString.alquilar[lang]}</button> 
              }
            </div>
          </div>    
        }
        { UIX.showErrors.show && 
          <div className='errors-wrap'>
            { UIX.showErrors.showError1 && <div className='error-txt'>{LangsString.errorSector[lang]}</div> }  
            { UIX.showErrors.showError2 && <div className='error-txt'>{LangsString.errorFechaInicio[lang]}</div> }  
            { UIX.showErrors.showError3 && <div className='error-txt'>{LangsString.errorFechaFin[lang]}</div> }  
          </div>
        }  

        { UIX.showForfaitOverlay && 
          <ForfaitOverlay lang={lang} handleForfaitButtonCLick={this.handleForfaitButtonCLick} />
        } 

        { UIX.showChangeToNoForfaitOverlay && 
          <ChangeToNoForfaitOverlay lang={lang} handleTonoForfaitStationOverlayCLick={this.handleTonoForfaitStationOverlayCLick} linkToCesta={UIX.linkToCesta} />
        } 

        { UIX.marquee !== '' && <Marquee text={UIX.marquee} /> }  

      </div>
    )
  }
}  

// Mapeamos el estado a las propiedades.
const mapStateToProps = (state) => {
  return { 
    ...state.buscadorSki, 
    lang: state.buscador.language 
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
    onEndDateSelection: (date) => dispatch(handleEndDateSelection(date)),
    onButtonClick: () => dispatch(handleButtonClick()),
    onForfaitButtonClick: (e) => dispatch(handleForfaitButtonClick(e)),
    onChangeToNoForfaitStation: (target) => dispatch(changeToNoForfaitStation(target)),
    onCloseChangeStationOverlay: () => dispatch(closeChangeStationOverlay())
  }
}


// Conectamos el Componente al storage
const BuscadorSki = connect(mapStateToProps, mapDispatchToProps)(BuscadorSkiComponent)

export default BuscadorSki;
