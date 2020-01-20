import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CuantosDiasSelector = (props) => {
  
  const [showDays, setShowDays] = useState(false);
  
  const toggleCuantosDias = () => {
    setShowDays(!showDays);
  } 

  const handleDaySelection = (e) => {
    setShowDays(false)
    props.selectionCuantosDias(e.target.value);
  }

  const getFormatedDate = (inNDays) => {
    let month = inNDays.getMonth();
    month = month + 1 > 12 ? 1 : month + 1;
    month = month < 10 ? '0' + month : month;
    let day = inNDays.getDate();
    day = parseInt(day) < 10 ? '0' + day : day;

    return `${inNDays.getFullYear()}-${month}-${day}`;
  }

  const calcManydays = (bloquedDays = [], firstDay = '' ) => {
    
    let manyDaysAvailable = [];
    
    for (let i=0; i<12; i++) {

      let inNDays = new Date(firstDay);
      inNDays.setDate(inNDays.getDate() + i);
      let formatedDate = getFormatedDate(inNDays);
      if ( !bloquedDays.includes(formatedDate) ){
        manyDaysAvailable.push(formatedDate);
      } else {
        break;
      }
    }
    return manyDaysAvailable;
  
  }

  const manyDaysAvailable = calcManydays(props.disabledDates, props.firstDaySelected);

  if ( props.howManyDays > manyDaysAvailable.length ) {
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