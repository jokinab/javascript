import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import DatePickerPlaceHolder from './../datePickerPlaceHolder/DatePickerPlaceHolder';

import "react-datepicker/dist/react-datepicker.css";

const StartDatePicker = (props) => {
  return (
    <div className='buscador-item'>
      { !props.isSectorSelected && <DatePickerPlaceHolder textPlace={props.textPlace} handlePlaceHolderClick={props.handlePlaceHolderClick} classPlace={props.classPlace} /> }
      { props.isSectorSelected &&   
        <DatePicker 
          dateFormat="dd-MM-yyyy"
          value={props.startDate} 
          selected={props.selectedDate}
          onChange={props.handleStartDateSelection}
          className={props.classPlace}
          />       
      }  
    </div>
  )
}

StartDatePicker.propTypes = {
  startDate: PropTypes.string,
  handleStartDateSelection: PropTypes.func,
  classPlace: PropTypes.string,
  isSectorSelected: PropTypes.bool,
  textPlace: PropTypes.string,
  handlePlaceHolderClick: PropTypes.func
}

export default StartDatePicker;