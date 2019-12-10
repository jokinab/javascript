import React from 'react';
import PropTypes from 'prop-types';
import EstacionItem from './EstacionItem';
import { CSSTransition } from 'react-transition-group';


const TiendasSelector = (props) => {

  const handleEstacionSelect = (e) => {
    props.handleEstacionClick(e.target);
  }
  
  return (
    <div className='buscador-item'> 
      <button value={props.displayEstaciones} onClick={props.handleEstacionTiendaselector} className={props.classPlace}>{props.placeholder}</button>
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
                    displayTiendasFromEstacion={props.displayTiendasFromEstacion} 
                    handleEstacionClick={(e)=>handleEstacionSelect(e)} 
                    handleTiendaClick={props.handleTiendaClick} />
                
            ) }
          </ul>
      </CSSTransition>
    </div>  
  )  
}  

TiendasSelector.propTypes = {
  placeholder: PropTypes.string,
  isNotAgencia: PropTypes.bool,
  displayTiendasFromEstacion: PropTypes.string,
  estacionesList: PropTypes.array,
  handleEstacionClick: PropTypes.func,
  handleTiendaClick: PropTypes.func,
  handleEstacionTiendaselector: PropTypes.func,
  classPlace:PropTypes.string
} 

export default TiendasSelector;