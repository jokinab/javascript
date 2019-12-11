import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  fetchEstacionesItems, 
  handleEstacionesButtonClick, 
  handleEstacionClick,
  handleHideErrors,
  handleShowErrors,
  handleSectorClick 
} from '../../actions/estaciones';

import './BuscadorSki.css';

import EstacionesSectoresSelector from './../../components/estacionesSectoresSelector/EstacionesSectoresSelector';
import StartDatePicker from '../../components/startDatePicker/StartDatePicker';


const defautValues = {
  selectedSector: {},
  selectedEstacionId: 0,
  startDate: new Date(),
  endDate: new Date(),
  estacionesList: []
}

const configBuscadorSki = {
  isNotAgencia: true,
  inputClass: 'input-buscador'
}

const lang = {
  placeholder: 'Estaciones / Sectores',
  placeHolderStartDate: 'Seleccione Fecha Inicio',
  placeHolderEndDate: 'Seleccione Fecha Fin'
}

class BuscadorSkiComponent extends Component{
  constructor(...args){
    super(...args);
    this.state = {
      estacionesList: defautValues.estacionesList,
      selectedSector: defautValues.selectedSector,
      selectedEstacionId: defautValues.selectedEstacionId,
      displaySectoresFromEstacion: '-1', // Para mostrar u ocultar las tiendas dependiendo de la estacion (si esta seleccionada lo oculta, o si se ha seleccionado la otra estacion)
      displayEstaciones: false, // Mostrar estaciones cuando se ha clickado en el boton inicial del buscador
      isNotAgencia: configBuscadorSki.isNotAgencia,
      startDate: defautValues.startDate,
      endDate: defautValues.endDate,
      isSectorSelected: false,
      showErrors: false,
      showError1: false,
      placeholder: lang.placeholder,
      placeHolderStartDate: lang.placeHolderStartDate,
      placeHolderEndDate: lang.placeHolderEndDate
    }
    this.handleEstacionSectorSelector = this.handleEstacionSectorSelector.bind(this);
    this.handleEstacionClick = this.handleEstacionClick.bind(this);
    this.handleSectorClick = this.handleSectorClick.bind(this);
    this.handleStartDateSelection = this.handleStartDateSelection.bind(this);
    this.handlePlaceHolderStartDayClik = this.handlePlaceHolderStartDayClik.bind(this);
    this.handlePlaceHolderEndDayClik = this.handlePlaceHolderEndDayClik.bind(this);
  }

  handleEstacionSectorSelector(){
    this.props.onEstacionesButtonClick();

    // quitar cuando todo este conectado
    this.setState({ 
      displayEstaciones: this.props.UIX.displayEstaciones,
      displaySectoresFromEstacion: this.props.UIX.displaySectoresFromEstacion
    })

  }
    
  handleEstacionClick(target){

    this.props.onEstacionClick(target);

    // quitar cuando este todo conectado  
    if (this.props.UIX.isNotAgencia) {
      this.setState({
                    selectedEstacionId: this.props.UIX.selectedEstacionId,
                    displaySectoresFromEstacion: this.props.UIX.displaySectoresFromEstacion
                  });
    } else {
      this.setState({
        selectedEstacionId: this.props.UIX.selectedEstacionId,
        displayEstaciones: this.props.UIX.displayEstaciones,
        placeholder: this.props.UIX.placholder,
        isSectorSelected: true
      });
    } 
  }

  hideErrors(){

    this.props.onHideErrors();
    
    // Quitar cuando todo este conectado

    this.setState({
      showErrors: false,
      showError1: false
    });

  }

  handleSectorClick(e){
    this.hideErrors();

    this.props.onSectorClick(e);  

    // Quitar cuando todo este conectado  
    this.setState({ 
                    selectedSector: JSON.parse(e.target.value).id,
                    placeholder: JSON.parse(e.target.value).nombre,
                    displayEstaciones: !this.state.displayEstaciones,
                    isSectorSelected: true
                  })
  }

  handlePlaceHolderStartDayClik(){

    this.props.onShowErrors({
                    show: true,
                    showError1: true
                  });

    // Quitar cuando todo este conectado  
    this.setState({
                    showErrors: true,
                    showError1: true
                  });
  }

  handleStartDateSelection(date){
    this.setState({startDate: date});
  }

  handlePlaceHolderEndDayClik(){
    
  }  
  

  componentDidMount(){
    this.props.onFetchEstacionesItems();
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.estaciones.estacionesList !== prevProps.estaciones.estacionesList) {
      //this.setState( {estacionesList: this.props.estacionesList });
    }
  }  

  render(){
    return (
      <div className="buscador-container">
        { this.props.estaciones.estacionesList.length <= 0 && 
          <div>Loading</div>
        } 
        { this.props.estaciones.estacionesList.length > 0 && 
          <div className="buscador-items">  
            <EstacionesSectoresSelector 
              placeholder={this.props.UIX.placeholder}
              isNotAgencia={this.props.UIX.isNotAgencia} 
              estacionesList={this.props.estaciones.estacionesList}
              displaySectoresFromEstacion={this.props.UIX.displaySectoresFromEstacion}
              displayEstaciones={this.props.UIX.displayEstaciones}
              handleEstacionClick={this.handleEstacionClick} 
              handleSectorClick={this.handleSectorClick}
              handleEstacionSectorSelector={this.handleEstacionSectorSelector}
              classPlace={configBuscadorSki.inputClass} />
            
            <StartDatePicker
              isSectorSelected={this.state.isSectorSelected}
              textPlace={this.state.placeHolderStartDate}
              handlePlaceHolderClick={this.handlePlaceHolderStartDayClik}
              startDate={this.state.startDate.toLocaleDateString()} 
              selectedDate={this.state.startDate}
              handleStartDateSelection={this.handleStartDateSelection}
              classPlace={configBuscadorSki.inputClass} />
            
          </div>    
        }
        { this.props.UIX.showErrors && 
          <div className='errors-wrap'>
            { this.props.UIX.showError1 && <div className='error'>Seleccione primero Sector</div> }  

            
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
    onSectorClick: (e) => dispatch(handleSectorClick(e))
  }
}


// Conectamos el Componente al storage
const BuscadorSki = connect(mapStateToProps, mapDispatchToProps)(BuscadorSkiComponent)

export default BuscadorSki;
