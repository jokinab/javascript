import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "./node_modules/react-datepicker/dist/react-datepicker.css";

const StartDatePicker = (props) => {
  return (
    <DatePicker 
      dateFormat="dd-MM-yyyy"
      value={props.startDate} 
      selected={props.selectedDate}
      onChange={props.handleStartDateSelection}
      className={props.classPlace}
      />       
  )
}

StartDatePicker.propTypes = {
  startDate: PropTypes.string,
  handleStartDateSelection: PropTypes.func,
  classPlace: PropTypes.string
}

export default StartDatePicker;