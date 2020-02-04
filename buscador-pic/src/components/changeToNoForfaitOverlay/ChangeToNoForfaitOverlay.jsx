import React from 'react';
import PropTypes from 'prop-types';
import { LangsString } from './../../lang/Lang';

const ChangeToNoForfaitOverlay = (props) => {

  return (
    <div className='forfait-layer'>
      <div className='forfait-wrap'>
        <header className='forfait-warning-hdr'>
          <div className='forfait-novedad'>
            <h2 className='forfait-novedad-tit'>{LangsString.atencion[props.lang]}</h2>
          </div>
        </header>
        <div className='forfait-cnt-warning'>
          <p className='forfait-cnt-txt'>{LangsString.previamtenteForfait[props.lang]}</p>
          <p className='forfait-cnt-txt'>{LangsString.queDeseas[props.lang]}</p>
        </div>
        <div className='forfait-buttons'>
          <a className='forfait-button cambiar-red' href={props.linkToCesta} title={props.linkToCesta}>{LangsString.irACesta[props.lang]}</a>
          <button className='forfait-button cambiar-red' value='true' onClick={ (e) => props.handleTonoForfaitStationOverlayCLick(e) } >{LangsString.cambiarTxt[props.lang]}</button>
          <button className='forfait-button cambiar-red' value='false' onClick={ (e) => props.handleTonoForfaitStationOverlayCLick(e) } >{LangsString.noCambiarTxt[props.lang]}</button>
        </div>
      </div>
    </div>  
  )
  
}

ChangeToNoForfaitOverlay.propTypes = {
  lang: PropTypes.string,
  handleTonoForfaitStationOverlayCLick: PropTypes.func,
  linkToCesta: PropTypes.string
}

export default ChangeToNoForfaitOverlay;