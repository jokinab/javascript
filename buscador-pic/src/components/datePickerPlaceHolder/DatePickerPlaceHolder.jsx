import React from 'react';
import PropTypes from 'prop-types';

const DatePickerPlaceHolder = (props) => {
  return (
    <div className='buscador-item-placeholer'>
      <button className={props.classPlace} onClick={props.handlePlaceHolderClick}>{props.textPlace}</button>
    </div>  
  )
}

DatePickerPlaceHolder.propTypes = {
  classPlace: PropTypes.string,
  handlePlaceHolderClick: PropTypes.func,
  textPlace: PropTypes.string
}


export default DatePickerPlaceHolder;