import React, { Component } from 'react';
import './BuscadorSki.css';

import TiendasSelector from './../../components/tiendasSelector/TiendasSelector';
import StartDatePicker from '../../components/startDatePicker/StartDatePicker';
import DatePickerPlaceHolder from './../../components/datePickerPlaceHolder/DatePickerPlaceHolder';

const defautValues = {
  selectedTiendaa: {},
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
  placeholder: 'Estaciones / Tiendas',
  placeHolderStartDate: 'Seleccione Fecha Inicio',
  placeHolderEndDate: 'Seleccione Fecha Fin'
}

class BuscadorSki extends Component{
  constructor(...args){
    super(...args);
    this.state = {
      estacionesList: defautValues.estacionesList,
      selectedTienda: defautValues.selectedTienda,
      selectedEstacionId: defautValues.selectedEstacionId,
      displayTiendasFromEstacion: '-1', // Para mostrar u ocultar las tiendas dependiendo de la estacion (si esta seleccionada lo oculta, o si se ha seleccionado la otra estacion)
      displayEstaciones: false, // Mostrar estaciones cuando se ha clickado en el boton inicial del buscador
      isNotAgencia: configBuscadorSki.isNotAgencia,
      startDate: defautValues.startDate,
      endDate: defautValues.endDate,
      isTiendaSectorSelected: false,
      showErrors: false,
      showError1: false,
      placeholder: lang.placeholder,
      placeHolderStartDate: lang.placeHolderStartDate,
      placeHolderEndDate: lang.placeHolderEndDate
    }
    this.handleEstacionTiendaselector = this.handleEstacionTiendaselector.bind(this);
    this.handleEstacionClick = this.handleEstacionClick.bind(this);
    this.handleTiendaClick = this.handleTiendaClick.bind(this);
    this.handleStartDateSelection = this.handleStartDateSelection.bind(this);
    this.handlePlaceHolderStartDayClik = this.handlePlaceHolderStartDayClik.bind(this);
    this.handlePlaceHolderEndDayClik = this.handlePlaceHolderEndDayClik.bind(this);
  }

  handleEstacionTiendaselector(e){
    this.setState({ 
      displayEstaciones: !this.state.displayEstaciones,
      displayTiendasFromEstacion: '-1'
    })
  }
    
  handleEstacionClick(target){
    if (this.state.isNotAgencia) {
      this.setState({
                    selectedEstacionId: target.value,
                    displayTiendasFromEstacion: target.value === this.state.displayTiendasFromEstacion ? '-1' : target.value
                  });
    } else {
      let estacion = this.state.estacionesList.find(estacion => estacion.estacionId === target.value);
      this.setState({
        selectedEstacionId: target.value,
        displayEstaciones: !this.state.displayEstaciones,
        placeholder: estacion.nombre,
        isTiendaSectorSelected: true
      });
    } 
  }

  hideErrors(){
    this.setState({
      showErrors: false,
      showError1: false
    });
  }

  handleTiendaClick(e){
    this.hideErrors();
    this.setState({ 
                    selectedTienda: JSON.parse(e.target.value),
                    placeholder: JSON.parse(e.target.value).nombre,
                    displayEstaciones: !this.state.displayEstaciones,
                    isTiendaSectorSelected: true
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
    fetch('https://testing.picnegre.com/alquiler/getAllEstacionesTiendas')
      .then( (response) => {
        return response.json();
      })
      .then( (myJson) => {
        this.setState({ 
          estacionesList: myJson
        })
        
      });
  }


  render(){
    return (
      <div className="buscador-container">
        { this.state.estacionesList.length <= 0 && 
          <div>Loading</div>
        } 
        { this.state.estacionesList.length > 0 && 
          <div className="buscador-items">  
            <TiendasSelector 
              placeholder={this.state.placeholder}
              isNotAgencia={this.state.isNotAgencia} 
              displayTiendasFromEstacion={this.state.displayTiendasFromEstacion}
              displayEstaciones={this.state.displayEstaciones}
              estacionesList={this.state.estacionesList}
              handleEstacionClick={this.handleEstacionClick} 
              handleTiendaClick={this.handleTiendaClick}
              handleEstacionTiendaselector={this.handleEstacionTiendaselector}
              classPlace={configBuscadorSki.inputClass} />
            
            <StartDatePicker
              isTiendaSectorSelected={this.state.isTiendaSectorSelected}
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
            { this.state.showError1 && <div className='error'>Seleccione primero tienda</div> }  

            
          </div>
        }  
      </div>
    )
  }
}  

export default BuscadorSki;
