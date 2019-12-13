import React from 'react';
import PropTypes from 'prop-types';
import SectorItem from './SectorItem';

const EstacionItem = (props) => {
  return (
    <li style={ { backgroundImage:  `url(${props.estacion.imagen})` } }>
      <button onClick={props.handleEstacionClick} value={props.estacion.estacionId}>{props.estacion.nombre}</button>
      { ( props.isNotAgencia && ( props.displaySectoresFromEstacion ===  props.estacion.estacionId.toString() ) ) &&
        <ul>
          { props.estacion.sectores.map( (sector, index ) => 
              <SectorItem 
                key={`${props.estacion.estacionId}${index}`} 
                sector={sector} handleSectorClick={props.handleSectorClick} />
          ) }
        </ul>
      }  
    </li>
  )
}

EstacionItem.propTypes = {
  estacion: PropTypes.object,
  isNotAgencia: PropTypes.bool,
  displaySectoresFromEstacion: PropTypes.string,
  handleSectorClick: PropTypes.func,
  handleEstacionClick: PropTypes.func,
  index: PropTypes.number
}


export default EstacionItem;