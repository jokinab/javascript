import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DateTools from './../../lib/dateTools';

const CuantosDiasSelector = (props) => {
  
  const [showDays, setShowDays] = useState(false);
  
  const toggleCuantosDias = () => {
    setShowDays(!showDays);
  } 

  const handleDaySelection = (e) => {
    setShowDays(false)
    props.selectionCuantosDias(e.target.value);
  }

  const manyDaysAvailable = DateTools.calcManydays(props.disabledDates, props.firstDaySelected);
  
  if ( manyDaysAvailable.length !== 0 && props.howManyDays > manyDaysAvailable.length ) {
    props.selectionCuantosDias(1);
  }

  return (
    
    <div className='icon-input-wrap'>
      <button 
        value={props.howManyDays > manyDaysAvailable.length ? 1 : props.howManyDays } 
        onClick={ () => toggleCuantosDias() }
        className='input-buscador'>
        {props.howManyDays > manyDaysAvailable.length ? 1 : props.howManyDays }
      </button>
      { showDays && 
        <ul className="tiendas-selector-container">
          { manyDaysAvailable.map( (item, index) => {
            return (
              <li className='day-item' key={index+1}>
                <button className='day-button' onClick={(e) => handleDaySelection(e) } value={index+1}>{index+1}</button>
              </li>
            )  
            })
          }
        </ul>
      }          
    </div>  
  )  
  
}  

CuantosDiasSelector.propTypes = {
  howManyDays: PropTypes.string,
  firstDaySelected: PropTypes.object,
  disabledDates: PropTypes.array,
  selectionCuantosDias: PropTypes.func
} 

export default CuantosDiasSelector;