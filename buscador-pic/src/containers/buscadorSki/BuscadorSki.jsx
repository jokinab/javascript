import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEstacionesItems } from './../../actions/buscadorSki';

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
    this.handleEstacionSectorselector = this.handleEstacionSectorselector.bind(this);
    this.handleEstacionClick = this.handleEstacionClick.bind(this);
    this.handleSectorClick = this.handleSectorClick.bind(this);
    this.handleStartDateSelection = this.handleStartDateSelection.bind(this);
    this.handlePlaceHolderStartDayClik = this.handlePlaceHolderStartDayClik.bind(this);
    this.handlePlaceHolderEndDayClik = this.handlePlaceHolderEndDayClik.bind(this);
  }

  handleEstacionSectorselector(e){
    this.setState({ 
      displayEstaciones: !this.state.displayEstaciones,
      displaySectoresFromEstacion: '-1'
    })
  }
    
  handleEstacionClick(target){
    if (this.state.isNotAgencia) {
      this.setState({
                    selectedEstacionId: target.value,
                    displaySectoresFromEstacion: target.value === this.state.displaySectoresFromEstacion ? '-1' : target.value
                  });
    } else {
      let estacion = this.state.estacionesList.find(estacion => estacion.estacionId === target.value);
      this.setState({
        selectedEstacionId: target.value,
        displayEstaciones: !this.state.displayEstaciones,
        placeholder: estacion.nombre,
        isSectorSelected: true
      });
    } 
  }

  hideErrors(){
    this.setState({
      showErrors: false,
      showError1: false
    });
  }

  handleSectorClick(e){
    this.hideErrors();
    this.setState({ 
                    selectedSector: JSON.parse(e.target.value),
                    placeholder: JSON.parse(e.target.value).nombre,
                    displayEstaciones: !this.state.displayEstaciones,
                    isSectorSelected: true
                  })
  }

  handlePlaceHolderStartDayClik(){
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
    if (this.props.estacionesList !== prevProps.estacionesList) {
      //this.setState( {estacionesList: this.props.estacionesList });
    }
  }  

  render(){
    return (
      <div className="buscador-container">
        { this.props.estacionesList.length <= 0 && 
          <div>Loading</div>
        } 
        { this.props.estacionesList.length > 0 && 
          <div className="buscador-items">  
            <EstacionesSectoresSelector 
              placeholder={this.state.placeholder}
              isNotAgencia={this.state.isNotAgencia} 
              displaySectoresFromEstacion={this.state.displaySectoresFromEstacion}
              displayEstaciones={this.state.displayEstaciones}
              estacionesList={this.props.estacionesList}
              handleEstacionClick={this.handleEstacionClick} 
              handleSectorClick={this.handleSectorClick}
              handleEstacionSectorselector={this.handleEstacionSectorselector}
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
        { this.state.showErrors && 
          <div className='errors-wrap'>
            { this.state.showError1 && <div className='error'>Seleccione primero Sector</div> }  

            
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
    onFetchEstacionesItems: () => dispatch(fetchEstacionesItems())
  }
}


// Conectamos el Componente al storage
const BuscadorSki = connect(mapStateToProps, mapDispatchToProps)(BuscadorSkiComponent)

export default BuscadorSki;
