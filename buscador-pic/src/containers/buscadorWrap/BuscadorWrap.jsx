import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  handleSelection,
  fetchUserInfo
} from './../../actions/buscadorWrap/buscador';

import BuscadorSki from '../buscadorSki/BuscadorSki';
import BuscadorBici from '../buscadorBici/BuscadorBici';
import { SelectorSkiBici } from '../../components/selectorSkiBici/SelectorSkiBici';
import Loading from './../../components/loading/Loading';
import TiendasFromEstacion from './../../components/tiendasFromEstacion/TiendasFromEstacion';
import TiendasFromSector from './../../components/tiendasFromSector/TiendasFromSector';
import ApiPic from './../../apiPic/apiPic';

class BuscadorWrapComponent extends Component{
  constructor(...args) {
    super(...args);
    this.state = {
      hasUserInfo: false,
      estacionBici: {},
      sectorSki: {}      
    }
    this.handleSelection = this.handleSelection.bind(this);
  } 
  
  handleSelection = (e) => {
    this.props.onHandleselection(e.target.value);
  }  

  componentDidMount(){
    if ( !this.state.hasUserInfo )
      this.props.onFetchUserInfo();
  }

  static getDerivedStateFromProps(nextProps, prevState){

    return {
      hasUserInfo: false,
      estacionBici: nextProps.estacionBici,
      sectorSki: nextProps.sectorSki
    }

  }

  render() {

    let activeSki = ( this.props.selected === 'ski' || this.props.selected === undefined ) ? true : false;
    let activeBici = this.props.selected === 'bici' ? true : false;
    
    return (
      <div className='buscador-wrap'>
        { this.props.hasInitInfo && this.props.showSki && this.props.showBici && <SelectorSkiBici lang={this.props.language} activeBici={activeBici} activeSki={activeSki} handleSelection={this.handleSelection} /> } 
        <div className='buscador-cnt'>
          { !this.props.hasInitInfo && <Loading /> }
          { this.props.hasInitInfo && this.props.showSki && activeSki && <BuscadorSki /> }
          { this.props.hasInitInfo && this.props.showBici && activeBici && <BuscadorBici /> }       
        </div>

        { 
          activeBici && ApiPic.isHome() !== '/home/home'  && typeof this.state.estacionBici !== 'undefined' && this.props.showBici && this.state.estacionBici !== false && 
            <TiendasFromEstacion estacion={this.state.estacionBici} lang={this.props.language} /> 
        }
        { 
          this.props.isNotAgencia && activeSki && ApiPic.isHome() !== '/home/home'  && typeof this.props.sectorSki !== 'undefined' && this.props.showSki && this.state.sectorSki !== false && 
            <TiendasFromSector sector={this.state.sectorSki} estacionNombre={this.props.estacionSki} lang={this.props.language} /> 
        }
        
      </div>
    )
  }  
  
}  

const getEstacionNameFormSectorId = ( selectedSector, estacionesList) => estacionesList.find( estacion => estacion.sectores.find( sector => sector.id === selectedSector ) ).nombre;


const getSelectedSector = ( selectedSector = -1, estacionesList=[ ]) => {

  let sectorToReturn = {};

  if ( selectedSector !== -1 && estacionesList.length > 0 ) {

    let selectedEstacion = estacionesList.find( estacion => estacion.sectores.find( sector => sector.id === selectedSector ) );
    sectorToReturn = selectedEstacion.sectores.find( sector => sector.id === selectedSector );

  }

  return sectorToReturn;
}

// Mapeamos el estado a las propiedades.
const mapStateToProps = (state) => {
  return {
    ...state.buscador,
    estacionBici: typeof state.buscadorBici !== 'undefined' ? state.buscadorBici.estaciones.estacionesList.find( estacion => estacion.estacionId === state.buscadorBici.UIX.selectedEstacionId ) : false,
    sectorSki: ( typeof state.buscadorSki !== 'undefined' && state.buscadorSki.UIX.isSectorSelected ) ? getSelectedSector(state.buscadorSki.UIX.selectedSector, state.buscadorSki.estaciones.estacionesList) : false,
    estacionSki: ( state.buscador.isNotAgencia && typeof state.buscadorSki !== 'undefined' && state.buscadorSki.UIX.isSectorSelected ) ? getEstacionNameFormSectorId(state.buscadorSki.UIX.selectedSector, state.buscadorSki.estaciones.estacionesList) : ''
  }
}

// Mapeamos las acciones a las propiedades.
const mapDispatchToProps = (dispatch) => {
  return {
    onHandleselection: (e) => dispatch(handleSelection(e)),
    onFetchUserInfo: () => dispatch(fetchUserInfo())
  }
}

// Conectamos el Componente al storage
const BuscadorWrapContainer = connect(mapStateToProps, mapDispatchToProps)(BuscadorWrapComponent)

export default BuscadorWrapContainer;
