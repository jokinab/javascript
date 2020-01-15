import React from 'react';
import PropTypes from 'prop-types';

const SectorItem = (props) => {
  return (
    <li className='sector-item'>
      <button className='sector-button' value={JSON.stringify(props.sector)} onClick={props.handleSectorClick}>
        { props.sector.nombre }
      </button>
    </li>
  )
}

SectorItem.propTypes = {
  tienda: PropTypes.object,
  handleSectorClick: PropTypes.func
}

export default SectorItem;