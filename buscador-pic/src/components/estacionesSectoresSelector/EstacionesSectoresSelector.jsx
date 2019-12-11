import React from 'react';
import PropTypes from 'prop-types';
import EstacionItem from './EstacionItem';

const EstacionesSectoresSelector = (props) => {

  const handleEstacionSelect = (e) => {
    props.handleEstacionClick(e.target);
  }
  
  return (
    <div className='buscador-item'> 
      <button value={props.displayEstaciones} onClick={props.handleEstacionSectorSelector} className={props.classPlace}>{props.placeholder}</button>
      { props.displayEstaciones && 
        <ul className="tiendas-selector-container">
          { props.estacionesList.map( (estacion, index) =>
              
                <EstacionItem 
                  key={index} 
                  estacion={estacion} 
                  isNotAgencia={props.isNotAgencia}
                  displaySectoresFromEstacion={props.displaySectoresFromEstacion} 
                  handleEstacionClick={(e)=>handleEstacionSelect(e)} 
                  handleSectorClick={props.handleSectorClick} />
              
          ) }
        </ul>
      }          
    </div>  
  )  
}  

EstacionesSectoresSelector.propTypes = {
  placeholder: PropTypes.string,
  isNotAgencia: PropTypes.bool,
  displayTiendasFromEstacion: PropTypes.string,
  estacionesList: PropTypes.array,
  handleEstacionClick: PropTypes.func,
  handleTiendaClick: PropTypes.func,
  handleEstacionSectorSelector: PropTypes.func,
  classPlace:PropTypes.string
} 

export default EstacionesSectoresSelector;