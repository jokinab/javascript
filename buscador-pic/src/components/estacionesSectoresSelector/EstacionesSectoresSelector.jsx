import React from 'react';
import PropTypes from 'prop-types';
import EstacionItem from './EstacionItem';
import { CSSTransition } from 'react-transition-group';


const EstacionesSectoresSelector = (props) => {

  const handleEstacionSelect = (e) => {
    props.handleEstacionClick(e.target);
  }
  
  return (
    <div className='buscador-item'> 
      <button value={props.displayEstaciones} onClick={props.handleEstacionSectorselector} className={props.classPlace}>{props.placeholder}</button>
      <CSSTransition
        in={props.displayEstaciones}
        timeout={100}
        classNames="slide"
        unmountOnExit>
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
      </CSSTransition>
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
  handleEstacionSectorselector: PropTypes.func,
  classPlace:PropTypes.string
} 

export default EstacionesSectoresSelector;