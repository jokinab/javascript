import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerPlaceHolder from '../../components/datePickerPlaceHolder/DatePickerPlaceHolder';
import { LangsString } from '../../lang/Lang';
import MensajeBuscadorItem from '../../components/mensajeBuscadorItem/MensajeBuscadorItem';
// get our fontawesome imports
import { faMapMarkerAlt, faCalendarAlt, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from './../../components/loading/Loading';
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
  handleCuantosDiasSelection 
} from '../../actions/bici/estaciones';
import EstacionesSectoresSelector from '../../components/estacionesSectoresSelector/EstacionesSectoresSelector';
import ForfaitOverlay from '../../components/forfaitOverlay/ForfaitOverlay';
import CuantosDiasSelector from './../../components/cuantosDiasSelector/CuantosDiasSelector';

class BuscadorBiciComponent extends Component{
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
    console.log(e.target.value);
    this.props.onForfaitButtonClick(e.target.value);
  }

  componentDidMount(){
    this.hideErrors();
    if (! this.props.estaciones.estacionesList.length > 0 )
      this.props.onFetchEstacionesItems(this.props.isNotAgencia);
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.UIX.sendData) {
      alert('Mandar datos');
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
        
        { estacionesList.length > 0 && <MensajeBuscadorItem title={LangsString.biciTitle[lang]} subtitle={LangsString.biciSubTitle[lang]} /> }
        
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
                  classPlace='input-buscador' />
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
                    classPlace='input-buscador' /> }
                
                { UIX.isSectorSelected &&   
                  <DatePicker 
                    dateFormat="dd-MM-yyyy"
                    selected={UIX.startDatePicker.selectedDate}
                    onChange={(date) => this.handleStartDateSelection(date)}
                    className='input-buscador'
                    excludeDates={UIX.disabledDays.map( date => new Date(date) )}
                    minDate={new Date(UIX.firstDayAvailable)}
                    />       
                }
                <FontAwesomeIcon icon={faCalendarAlt} />
              </div>  
            </div>  

            <div className='buscador-item'>
              <div className='icon-input-wrap'>   
                { ( !UIX.isSectorSelected || UIX.startDatePicker.selectedDate === '' ) && 
                  <DatePickerPlaceHolder 
                    textPlace={LangsString.cuantosDias[lang]} 
                    handlePlaceHolderClick={ () =>this.handlePlaceHolderEndDayClik(UIX.startDatePicker.isStartDateSelected) } 
                    classPlace='input-buscador' /> }
                
                { ( UIX.isSectorSelected && UIX.startDatePicker.selectedDate !== '' ) && 
                  <CuantosDiasSelector
                    howManyDays={String(UIX.howManyDays)} 
                    firstDaySelected={UIX.startDatePicker.selectedDate}
                    disabledDates={UIX.disabledDays}
                    selectionCuantosDias={ (e) => this.props.onCuantosDiasSelect(e) }
                  />   
                }
                <FontAwesomeIcon icon={faAngleDown} />
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
            { UIX.showErrors.showError1 && <div className='error'>{LangsString.errorSector[lang]}</div> }  
            { UIX.showErrors.showError2 && <div className='error'>{LangsString.errorFechaInicio[lang]}</div> }  
            { UIX.showErrors.showError3 && <div className='error'>{LangsString.errorCuantosDias[lang]}</div> }   
          </div>
        }  

        { UIX.showForfaitOverlay && 
          <ForfaitOverlay lang={lang} handleForfaitButtonCLick={this.handleForfaitButtonCLick} />
        } 

      </div>
    )
  }
}  

// Mapeamos el estado a las propiedades.
const mapStateToProps = (state) => {
  return { 
    ...state.buscadorBici, 
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
    onCuantosDiasSelect: (e) => dispatch(handleCuantosDiasSelection(e) )
  }
}


// Conectamos el Componente al storage
const BuscadorBici = connect(mapStateToProps, mapDispatchToProps)(BuscadorBiciComponent)

export default BuscadorBici;
