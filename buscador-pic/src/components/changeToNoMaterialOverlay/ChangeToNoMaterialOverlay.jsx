import React from 'react';
import PropTypes from 'prop-types';
import { LangsString } from '../../lang/Lang';

const ChangeToNoMaterialOverlay = (props) => {

  return (
    <div className='forfait-layer'>
      <div className='forfait-wrap'>
        <header className='forfait-warning-hdr'>
          <div className='forfait-novedad'>
            <h2 className='forfait-novedad-tit'>{LangsString.atencion[props.lang]}</h2>
          </div>
        </header>
        <div className='forfait-cnt-warning'>
          { !props.noMaterialSector.hasRopa && <p className='forfait-cnt-txt'>{LangsString.mensajeRopa[props.lang]}</p> }
          { props.noMaterialSector.forfait === 0 && <p className='forfait-cnt-txt'>{LangsString.mensajeForfait[props.lang]}</p> }
        </div>
        <div className='forfait-buttons'>
          <button className='forfait-button cambiar-red' value='true' onClick={ (e) => props.handleToNoMaterialSectorOverlayCLick(e) } >{LangsString.cambiarTxt[props.lang]}</button>
        </div>
      </div>
    </div>  
  )
  
}

ChangeToNoMaterialOverlay.propTypes = {
  lang: PropTypes.string,
  handleToNoMaterialSectorOverlayCLick: PropTypes.func,
  linkToCesta: PropTypes.string,
  noMaterialSector: PropTypes.object
}

export default ChangeToNoMaterialOverlay;