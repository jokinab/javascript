import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  handleSelection,
  fetchUserInfo
} from './../../actions/buscadorWrap/buscador';

import BuscadorSki from '../buscadorSki/BuscadorSki';
import { SelectorSkiBici } from '../../components/selectorSkiBici/SelectorSkiBici';

class BuscadorWrapComponent extends Component{
  constructor(...args) {
    super(...args);
    this.state = {
      hasUserInfo: false
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

  render() {

    let activeSki = ( this.props.selected === 'ski' || this.props.selected === undefined ) ? true : false;
    let activeBici = this.props.selected === 'bici' ? true : false;

    return (
      <div className='buscador-wrap'>
        { this.props.hasInitInfo && this.props.showSki && this.props.showBici && <SelectorSkiBici activeBici={activeBici} activeSki={activeSki} handleSelection={this.handleSelection} /> } 
        { this.props.hasInitInfo && this.props.showSki && activeSki && <BuscadorSki /> }       
      </div>
    )
  }  
  
}  

// Mapeamos el estado a las propiedades.
const mapStateToProps = (state) => {
  return {
    ...state.buscador
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
