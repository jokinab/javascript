import React from 'react';
import PropTypes from 'prop-types';
import SectorItem from './SectorItem';

const EstacionItem = (props) => {
  return (
    <li className='estacion-item'>
      <div className={`estacion-image ${props.estacion.nombre}`}>
        <img src={props.estacion.imagen} alt={props.estacion.nombre} className={`img-estacion ${props.estacion.nombre}`} />
        <button className='estacion-button' onClick={props.handleEstacionClick} value={props.estacion.estacionId}>{props.estacion.nombre}</button>
      </div>  
      { ( props.isNotAgencia && ( props.displaySectoresFromEstacion ===  props.estacion.estacionId.toString() ) ) &&
        <ul className={`sectores-items ${props.estacion.nombre}`}>
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