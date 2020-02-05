import React from 'react';
import PropTypes from 'prop-types';
import { LangsString } from './../../lang/Lang';
import forfaitValldnord from './../../images/forfaitValldnord.jpg';
import forfaitSki from './../../images/forfaitSki.png';
import forfaitAhorra from './../../images/forfaitAhorra.png';
import forfaitdescuento from './../../images/forfaitDescuento.png';
import forfaitIcono from './../../images/forfaitIcono.png';

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
              <span className='forfait-item-text' dangerouslySetInnerHTML={{ __html: `${LangsString.forfaitListItemFirst[props.lang]}` }} />  
            </li>
            <li className='forfait-list-item'>
              <img src={forfaitAhorra} className='forfait-item-img' alt='' />
              <span className='forfait-item-text' dangerouslySetInnerHTML={{ __html: `${LangsString.forfaitListItemSecond[props.lang]}` }} />  
            </li>
            <li className='forfait-list-item'>
              <img src={forfaitdescuento} className='forfait-item-img' alt='' />
              <span className='forfait-item-text' dangerouslySetInnerHTML={{ __html: `${LangsString.forfaitListItemThird[props.lang]}` }} />  
            </li>
          </ul>
          <h3 className='forfait-message-2' dangerouslySetInnerHTML={{ __html: `${LangsString.forfaitSecondMessage[props.lang]}` }} />
          <p className='forfait-ext-3' dangerouslySetInnerHTML={{ __html: `${LangsString.forfaitLastMessageFirst[props.lang]}` }} />
          <p className='forfait-ext-3' dangerouslySetInnerHTML={{ __html: `${LangsString.forfaitLastMessageSecond[props.lang]}` }} />
        </div>
        <div className='forfait-buttons'>
          <button className='no-interest forfait-button' value={false} onClick={ (e) => props.handleForfaitButtonCLick(e) } >
            {LangsString.alquilarSinForfait[props.lang]}
          </button>
          <button className='si-interest forfait-button' value={true} onClick={ (e) => props.handleForfaitButtonCLick(e) } >
            <img src={forfaitIcono} className='forfait-img' alt='' />
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