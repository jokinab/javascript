import React from 'react';
import PropTypes from 'prop-types';
import { LangsString } from './../../lang/Lang';
import forfaitValldnord from './../../images/forfaitValldnord.jpg';
import forfaitSki from './../../images/forfaitSki.png';
import forfaitAhorra from './../../images/forfaitAhorra.png';
import forfaitdescuento from './../../images/forfaitDescuento.png';

const ForfaitOverlay = (props) => {
  return (
    <div className='forfait-layer'>
      <div className='forfait-wrap'>
        <header className='forfait-hdr'>
          <div className='forfait-novedad'>
            <h2 className='forfait-novedad-tit'>{LangsString.forfaitNovedad[props.lang]}</h2>
          </div>
          <div className='forfait-vallnord'>
            <img src={forfaitValldnord} className='for-vall-img' alt={LangsString.forfaitNovedad[props.lang]} />
          </div>
        </header>
        <div className='forfait-cnt'>
          <h2 className='forfait-message-1'>{LangsString.forfaitMainMessage[props.lang]}</h2>
          <ul className='forfait-list'>
            <li className='forfait-list-item'>
              <img src={forfaitSki} className='forfait-item-img' alt='' />
              <span className='forfait-item-text'>{LangsString.forfaitListItemFirst[props.lang]}</span>
            </li>
            <li className='forfait-list-item'>
              <img src={forfaitAhorra} className='forfait-item-img' alt='' />
              <span className='forfait-item-text'>{LangsString.forfaitListItemSecond[props.lang]}</span>
            </li>
            <li className='forfait-list-item'>
              <img src={forfaitdescuento} className='forfait-item-img' alt='' />
              <span className='forfait-item-text'>{LangsString.forfaitListItemThird[props.lang]}</span>
            </li>
          </ul>
          <h3 className='forfait-message-2'>{LangsString.forfaitSecondMessage[props.lang]}</h3>
          <p className='forfait-ext-3'>{LangsString.forfaitLastMessageFirst[props.lang]}</p>
          <p className='forfait-ext-3'>{LangsString.forfaitLastMessageSecond[props.lang]}</p>
        </div>
        <div className='forfait-buttons'>
          <button className='no-interest forfait-button' value={false} onClick={ (e) => props.handleForfaitButtonCLick(e) } >
            {LangsString.alquilarSinForfait[props.lang]}
          </button>
          <button className='si-interest forfait-button' value={true} onClick={ (e) => props.handleForfaitButtonCLick(e) } >
            {LangsString.alquilarConForfait[props.lang]}
          </button>
        </div>
      </div>
    </div>  
  )
}

ForfaitOverlay.propTypes = {
  lang: PropTypes.string,
  handleForfaitButtonCLick: PropTypes.func
}


export default ForfaitOverlay;