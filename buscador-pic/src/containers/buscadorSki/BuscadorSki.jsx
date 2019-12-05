import React, { Component } from 'react';
import './BuscadorSki.css';

import TiendasSelector from './../../components/tiendasSelector/TiendasSelector';

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
  placeholder: 'Estaciones / Tiendas'
}


class BuscadorSki extends Component{
  constructor(...args){
    super(...args);
    this.state = {
      selectedTienda: defautValues.selectedTienda,
      selectedEstacionId: defautValues.selectedEstacionId,
      placeholder: defautValues.placeholder,
      displayTiendasFromEstacion: '-1', // Para mostrar u ocultar las tiendas dependiendo de la estacion (si esta seleccionada lo oculta, o si se ha seleccionado la otra estacion)
      displayEstaciones: true, // Mostrar tiendas cuando se ha clickado en el boton inicial del buscador
      displayTiendas: true // En agencia Ski o bicicleta no se muestran las tiendas en el buscador
    }
    this.handleEstacionClick = this.handleEstacionClick.bind(this);
    this.handleTiendaClick = this.handleTiendaClick.bind(this);
  
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
                    placeholder: JSON.parse(e.target.value).nombre
                  })
  }

  render(){
    return (
      <div className="buscador-container">
        <TiendasSelector 
          placeholder={this.state.placeholder}
          displayTiendas={this.state.displayTiendas} 
          displayTiendasFromEstacion={this.state.displayTiendasFromEstacion}
          displayEstaciones={this.state.displayEstaciones}
          estacionesList={estacionesList}
          handleEstacionClick={this.handleEstacionClick} 
          handleTiendaClick={this.handleTiendaClick}
          />
      </div>
    )
  }
}  

export default BuscadorSki;
