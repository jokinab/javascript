import React from 'react';
import PropTypes from 'prop-types';
import { LangsString } from './../../lang/Lang';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhoneAlt, faEnvelope, faClock } from "@fortawesome/free-solid-svg-icons";


const TiendaFicha = (props) => {
  return (
    <article className="tienda-ficha-item">
      <header className="tienda-ficha-item-hdr">
        <h2 className="tienda-ficha-nombre">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>{ props.tienda.nombre }</span>
        </h2>
      </header>
      <div className="tienda-ficha-item-content">
        <div className="tienda-ficha-item-main-image">
            <img src={ props.tienda.images[0].url } width="450" height="253" alt={ props.tienda.images[0].alt } />
        </div>
        <div className="tienda-ficha-item-rest-img">
          { 
            props.tienda.images.map( ( image, index ) => { 
                if ( index === 0 ) {
                  return false;
                } else { 
                  return <img src={ image.url } width="136" height="76" alt={ image.alt } key={ index } />
                }
            }    
            )
          }
        </div>    
      </div>  

      <footer className="tienda-ficha-item-ftr"> 
       
        <div className="tienda-ficha-prop-item direccion">
          <span className="font-icon"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
          <div className="tienda-ficha-data-cnt">
            <p><strong>{ LangsString.direccionTxt[props.lang] }</strong><span>{ props.tienda.direccion }</span></p>
            <p>{ props.tienda.direccion2 }</p>     
            <p>X: { props.tienda.coordX }</p> 
            <p>Y: { props.tienda.coordY }</p>
            <p>
              <a href={ props.tienda.linkMap } className="google-ficha-link" target="_blank" rel="noopener noreferrer" >
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                { LangsString.verEnGoogleTxt[props.lang] }
              </a>
            </p>
          </div>  
        </div>
        <div className="tienda-ficha-prop-item telefono">
          <span className="font-icon"><FontAwesomeIcon icon={faPhoneAlt} /></span>
          <div className="tienda-ficha-data-cnt">
            <strong>{ LangsString.telefonoTxt[props.lang] }</strong>
            <span>{ props.tienda.telefono }</span>
          </div>  
        </div>
        <div className="tienda-ficha-prop-item mail">
          <span className="font-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
          <div className="tienda-ficha-data-cnt">
            <strong>{ LangsString.emailTxt[props.lang] }</strong>
            <a href="mailto:web@picnegre.com" className="orange_link">{ props.tienda.email }</a>
          </div>  
        </div>
        <div className="tienda-ficha-prop-item reloj">
          <span className="font-icon"><FontAwesomeIcon icon={faClock} /></span>
          <div className="tienda-ficha-data-cnt">
            <strong>{ LangsString.horariosTxt[props.lang] }</strong>
            <span dangerouslySetInnerHTML={{ __html: `${props.tienda.horarios}` }} />
          </div>  
        </div>    
       
      </footer>

    </article>  
  )
  
}

TiendaFicha.propTypes = {
  estacion: PropTypes.object,
  lang: PropTypes.string
}

export default TiendaFicha;