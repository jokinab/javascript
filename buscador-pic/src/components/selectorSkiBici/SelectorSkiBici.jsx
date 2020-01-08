import React from 'react';

export const SelectorSkiBici = (props) => {
  
  return (
    <div className='buscador-selector'>
      <ul className='selector-list'>
        <li className={`selector-item ${props.activeSki}`}>
          <button value='ski' onClick={ (e) => props.handleSelection(e) }>SKI</button>
        </li>
        <li className={`selector-item ${props.activeBici}`}>
          <button value='bici' onClick={ (e) => props.handleSelection(e) }>BICI</button>
        </li>
      </ul> 
    </div>
  )
  
}  
