import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




const StartDatePicker = (props) => {
  
  return (
    <div>
      
      <DatePicker 
        dateFormat="dd-MM-yyyy"
        selected={props.startDateValue}
        onChange={(date) => props.handleStartDateSelection(date)}
        className={props.classPlace}
        />
        
 
    </div>          
  )
}

StartDatePicker.propTypes = {
  handleStartDateSelection: PropTypes.func,
  classPlace: PropTypes.string,
  startDateValue: PropTypes.object,
}

export default StartDatePicker;