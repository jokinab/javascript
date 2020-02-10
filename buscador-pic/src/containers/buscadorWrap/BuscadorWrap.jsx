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
import ApiPic from './../../apiPic/apiPic';

class BuscadorWrapComponent extends Component{
  constructor(...args) {
    super(...args);
    this.state = {
      hasUserInfo: false,
      estacion: {}
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
    // console.log(`Esto es ->>> ${JSON.stringify(nextProps.estacion)}`);
    return {
      hasUserInfo: false,
      estacion: nextProps.estacion
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

        { activeBici && ApiPic.isHome() !== '/home/home'  && typeof this.state.estacion !== 'undefined' && this.props.showBici && <TiendasFromEstacion estacion={this.state.estacion} lang={this.props.language} /> }

      </div>
    )
  }  
  
}  

// Mapeamos el estado a las propiedades.
const mapStateToProps = (state) => {
  return {
    ...state.buscador,
    estacion: typeof state.buscadorBici !== 'undefined' ? state.buscadorBici.estaciones.estacionesList.find( estacion => estacion.estacionId === state.buscadorBici.UIX.selectedEstacionId ) : false
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
