import React, { Component } from 'react';
import './BuscadorSki.css';

import TiendasSelector from './../../components/tiendasSelector/TiendasSelector';
import PicNegreDatePicker from './../../components/picNegreDatePicker/PicNegreDatePicker';

const estacionesList = [
  {
    'nombre': 'Valdnord',
    'imagen': 'https://www.picnegre.com/public/data/estaciones/vallnord-estacio.png', 
    'estacionId': 2,
    'tiendas': [
      {
        'nombre': 'Arinsal',
        'sectorId': 2,
        'tiendaId': 18,
        'forfait': 1,
        'max-dias-forfait': 10
      },
      {
        'nombre': 'Pal-La Massana',
        'sectorId': 9,
        'tiendaId': 24,
        'forfait': 1,
        'max-dias-forfait': 10
      },
      {
        'nombre': 'Ordino - Arcalis',
        'sectorId': 19,
        'tiendaId': 24,
        'forfait': 0,
        'max-dias-forfait': 0
      }
    ]
    
  },
  {
    'nombre': 'Grandvalira',
    'imagen': 'https://www.picnegre.com/public/data/estaciones/grandvalira-estacio.png', 
    'estacionId': 1,
    'tiendas': [
      {
        'nombre': 'Encamp',
        'sectorId': 11,
        'tiendaId': 25,
        'forfait': 0,
        'max-dias-forfait': 0
      },
      {
        'nombre': 'Canillo',
        'sectorId': 12,
        'tiendaId': 26,
        'forfait': 0,
        'max-dias-forfait': 0
      },
      {
        'nombre': 'Pal-La Massana',
        'sectorId': 13,
        'tiendaId': 28,
        'forfait': 0,
        'max-dias-forfait': 0
      }
    ]
    
  }
]

const defautValues = {
  selectedTiendaa: {},
  selectedEstacionId: 0,
  startDate: new Date(),
  endDate: new Date(),
  estacionesList: []
}


class BuscadorSki extends Component{
  constructor(...args){
    super(...args);
    this.state = {
      estacionesList: defautValues.estacionesList,
      selectedTienda: defautValues.selectedTienda,
      selectedEstacionId: defautValues.selectedEstacionId,
      placeholder: 'Estaciones / Tiendas',
      displayTiendasFromEstacion: '-1', // Para mostrar u ocultar las tiendas dependiendo de la estacion (si esta seleccionada lo oculta, o si se ha seleccionado la otra estacion)
      displayEstaciones: false, // Mostrar tiendas cuando se ha clickado en el boton inicial del buscador
      displayTiendas: true, // En agencia Ski o bicicleta no se muestran las tiendas en el buscador
      startDate: defautValues.startDate,
      placeHolderStartDate: 'Seleccione Fecha Inicio',
      endDate: defautValues.endDate,
      placeHolderEndDate: 'Seleccione Fecha Fin',
    }
    this.handleEstacionTiendaselector = this.handleEstacionTiendaselector.bind(this);
    this.handleEstacionClick = this.handleEstacionClick.bind(this);
    this.handleTiendaClick = this.handleTiendaClick.bind(this);
    this.handleStartDateSelection = this.handleStartDateSelection.bind(this);
  }

  handleEstacionTiendaselector(e){
    this.setState({ 
      displayEstaciones: !this.state.displayEstaciones,
      displayTiendasFromEstacion: '-1'
    })
  }
    
  handleEstacionClick(e){
    this.setState({
                    selectedEstacionId: e.target.value,
                    displayTiendasFromEstacion: e.target.value === this.state.displayTiendasFromEstacion ? '-1' : e.target.value
                  })
  }

  handleTiendaClick(e){
    this.setState({ 
                    selectedTienda: JSON.parse(e.target.value),
                    placeholder: JSON.parse(e.target.value).nombre,
                    displayEstaciones: !this.state.displayEstaciones
                  })
  }

  handleStartDateSelection(date){
    this.setState({startDate: date});
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
        <TiendasSelector 
          placeholder={this.state.placeholder}
          displayTiendas={this.state.displayTiendas} 
          displayTiendasFromEstacion={this.state.displayTiendasFromEstacion}
          displayEstaciones={this.state.displayEstaciones}
          estacionesList={this.state.estacionesList}
          handleEstacionClick={this.handleEstacionClick} 
          handleTiendaClick={this.handleTiendaClick}
          handleEstacionTiendaselector={this.handleEstacionTiendaselector}
          />
        <PicNegreDatePicker 
          startDate={this.state.startDate.toLocaleDateString()} 
          selectedDate={this.state.startDate}
          handleStartDateSelection={this.handleStartDateSelection}
          />
      </div>
    )
  }
}  

export default BuscadorSki;
