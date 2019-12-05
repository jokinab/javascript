import React from 'react';
import PropTypes from 'prop-types';

const TiendaItem = (props) => {
  return (
    <li>
      <button value={JSON.stringify(props.tienda)} onClick={props.handleTiendaClick}>
        { props.tienda.nombre }
      </button>
    </li>
  )
}

TiendaItem.propTypes = {
  tienda: PropTypes.object,
  handleTiendaClick: PropTypes.func
}

export default TiendaItem;