import React from 'react';
import PropTypes from 'prop-types';

export const SelectorSkiBici = (props) => {
  
  return (
    <div className='buscador-selector'>
      <ul className='selector-list'>
        <li className={`selector-item ${props.activeSki ? 'active' : ''}`}>
          <button className='selector-button' value='ski' onClick={ (e) => props.handleSelection(e) }>SKI</button>
        </li>
        <li className={`selector-item ${props.activeBici ? 'active' : ''}`}>
          <button className='selector-button' value='bici' onClick={ (e) => props.handleSelection(e) }>BICI</button>
        </li>
      </ul> 
    </div>
  )
  
}

SelectorSkiBici.propTypes = {
  activeSki: PropTypes.bool,
  activeBici: PropTypes.bool,
  handleSelection: PropTypes.func
}

