import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EstacionItem from './EstacionItem';
import { CSSTransition } from 'react-transition-group';


const TiendasSelector = (props) => {

  const [displaySelector, setdisplaySelector] = useState(false);  
  
  return (
    <div> 
      <button value={displaySelector} onClick={() => setdisplaySelector(!displaySelector)}>{props.placeholder}</button>
      <CSSTransition
        in={displaySelector}
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
} 

export default TiendasSelector;