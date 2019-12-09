import React from 'react';
import PropTypes from 'prop-types';
import EstacionItem from './EstacionItem';
import { CSSTransition } from 'react-transition-group';


const TiendasSelector = (props) => {

  
  return (
    <div> 
      <button value={props.displayEstaciones} onClick={props.handleEstacionTiendaselector}>{props.placeholder}</button>
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
                    displayTiendas={props.displayTiendas}
                    displayTiendasFromEstacion={props.displayTiendasFromEstacion} 
                    handleEstacionClick={props.handleEstacionClick} 
                    handleTiendaClick={props.handleTiendaClick} />
                
            ) }
          </ul>
      </CSSTransition>
    </div>  
  )  
}  

TiendasSelector.propTypes = {
  placeholder: PropTypes.string,
  displayTiendas: PropTypes.bool,
  displayTiendasFromEstacion: PropTypes.string,
  estacionesList: PropTypes.array,
  handleEstacionClick: PropTypes.func,
  handleTiendaClick: PropTypes.func,
  handleEstacionTiendaselector: PropTypes.func
} 

export default TiendasSelector;