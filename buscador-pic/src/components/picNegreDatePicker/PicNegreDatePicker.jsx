import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PicNegreDatePicker = (props) => {
  


  return (
    <DatePicker 
      dateFormat="dd-MM-yyyy"
      value={props.startDate} 
      selected={props.selectedDate}
      onChange={props.handleStartDateSelection}
      
      />       
  )
}

PicNegreDatePicker.propTypes = {
  startDate: PropTypes.string,
  handleStartDateSelection: PropTypes.func
}

export default PicNegreDatePicker;