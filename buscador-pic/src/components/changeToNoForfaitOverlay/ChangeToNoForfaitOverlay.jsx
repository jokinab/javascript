import React from 'react';
import PropTypes from 'prop-types';
// import { LangsString } from './../../lang/Lang';

const ChangeToNoForfaitOverlay = (props) => {

  return (
    <div className='forfait-layer'>
      <div className='forfait-wrap'>
        <header className='forfait-hdr'>
          <div className='forfait-novedad'>
            <h2 className='forfait-novedad-tit'>Atencion</h2>
          </div>
        </header>
        <div className='forfait-cnt'>
          <p className='forfait-ext-3'>Vas a cambiar a una estacion que no tiene Forfait.</p>
        </div>
        <div className='forfait-buttons'>
          <button className='forfait-button' value={false} onClick={ (e) => props.handleTonoForfaitStationOverlayCLick(e) } >
            Ir a cesta
          </button>
          <button className='forfait-button' value={true} onClick={ (e) => props.handleTonoForfaitStationOverlayCLick(e) } >
            Estoy de acuerdo
          </button>
        </div>
      </div>
    </div>  
  )
  
}

ChangeToNoForfaitOverlay.propTypes = {
  lang: PropTypes.string,
  handleTonoForfaitStationOverlayCLick: PropTypes.func
}

export default ChangeToNoForfaitOverlay;