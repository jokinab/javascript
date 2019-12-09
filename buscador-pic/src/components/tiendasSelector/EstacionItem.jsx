import React from 'react';
import PropTypes from 'prop-types';
import TiendaItem from './TiendaItem';

const EstacionItem = (props) => {
  return (
    <li style={ { backgroundImage:  `url(${props.estacion.imagen})` } }>
      <button onClick={props.handleEstacionClick} value={props.estacion.estacionId}>{props.estacion.nombre}</button>
      { ( props.displayTiendas && ( props.displayTiendasFromEstacion ===  props.estacion.estacionId.toString() ) ) &&
        <ul>
          { props.estacion.tiendas.map( (tienda, index ) => 
              <TiendaItem 
                key={`${props.estacion.estacionId}${index}`} 
                tienda={tienda} handleTiendaClick={props.handleTiendaClick} />
          ) }
        </ul>
      }  
    </li>
  )
}

EstacionItem.propTypes = {
  estacion: PropTypes.object,
  displayTiendas: PropTypes.bool,
  displayTiendasFromEstacion: PropTypes.string,
  handleTiendaClick: PropTypes.func,
  handleEstacionClick: PropTypes.func,
  index: PropTypes.number
}


export default EstacionItem;