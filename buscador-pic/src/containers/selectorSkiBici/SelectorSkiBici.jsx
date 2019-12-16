import React from 'react';
import { connect } from 'react-redux';

import { 
  handleSelection
} from '../../actions/selector/selector';

import BuscadorSki from './../buscadorSki/BuscadorSki';

const SelectorSkiBiciComponent = (props) => {
  
  const handleSelection = (e) => {
    props.onHandleselection(e.target.value);
  }  

  console.log(props);

  let activeSki = ( props.selected === 'ski' || props.selected === undefined ) ? true : false;
  let activeBici = props.selected === 'bici' ? true : false;

  return (
    <div className='buscador-selector'>
      <ul className='selector-list'>
        <li className={`selector-item ${activeBici}`}>
          <button value='ski' onClick={ (e) => handleSelection(e) }>SKI</button>
        </li>
        <li className={`selector-item ${activeBici}`}>
          <button value='bici' onClick={ (e) => handleSelection(e) }>BICI</button>
        </li>
      </ul> 
      { activeSki  && <BuscadorSki /> }       
    </div>
  )
  
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
    onHandleselection: (e) => dispatch(handleSelection(e))
  }
}


// Conectamos el Componente al storage
const SelectorSkiBici = connect(mapStateToProps, mapDispatchToProps)(SelectorSkiBiciComponent)

export default SelectorSkiBici;
