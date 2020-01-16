import React from 'react';
import PropTypes from 'prop-types';

const MensajeBuscadorItem = (props) => {
  return (
    <div className='buscador-message-wrap'>
      <h2 className='buscador-message-title'>{props.title}</h2>
      <p className='buscador-message-subtitle'>{props.subtitle}</p>
    </div>  
  )
}

MensajeBuscadorItem.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}


export default MensajeBuscadorItem;