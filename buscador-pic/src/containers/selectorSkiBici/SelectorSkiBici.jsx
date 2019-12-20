import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  handleSelection,
  fetchUserInfo
} from './../../actions/selector/selector';

import BuscadorSki from '../buscadorSki/BuscadorSki';

class SelectorSkiBiciComponent extends Component{
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
      <div className='buscador-selector'>
        <ul className='selector-list'>
          <li className={`selector-item ${activeBici}`}>
            <button value='ski' onClick={ (e) => this.handleSelection(e) }>SKI</button>
          </li>
          <li className={`selector-item ${activeBici}`}>
            <button value='bici' onClick={ (e) => this.handleSelection(e) }>BICI</button>
          </li>
        </ul> 
        { this.props.hasInitInfo && this.props.showSki && activeSki && <BuscadorSki isNotAgencia={this.props.userInfo.isNotAgencia} /> }       
      </div>
    )
  }  
  
}  

// Mapeamos el estado a las propiedades.
const mapStateToProps = (state) => {
  return {
    ...state.selector
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
const SelectorSkiBici = connect(mapStateToProps, mapDispatchToProps)(SelectorSkiBiciComponent)

export default SelectorSkiBici;
