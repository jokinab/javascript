import React from 'react';
import PropTypes from 'prop-types';
import { LangsString } from './../../lang/Lang';

const TiendaFicha = (props) => {
  return (
    <article className="tienda-ficha-item">
      <header className="tienda-ficha-item-hdr">
        <h2 className="tienda-ficha-nombre">
            <i className="fa fa-map-marker" aria-hidden="true"></i>
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
            <p><strong>{ LangsString.direccionTxt[props.lang] }</strong><span>{ props.tienda.direccion }</span></p>
            <p className="">{ props.tienda.direccion2 }</p>     
            <p className="">X: { props.tienda.coordX }</p> 
            <p className="">Y: { props.tienda.coordY }</p>
            <p className="">
              <a href={ props.tienda.linkMap } target="_blank" rel="noopener noreferrer" >
                <i className="fa fa-map-marker" aria-hidden="true"></i> 
                { LangsString.verEnGoogleTxt[props.lang] }
              </a>
            </p>
        </div>
        <div className="tienda-ficha-prop-item telefono">
            <strong>{ LangsString.telefonoTxt[props.lang] }</strong>
            <span>{ props.tienda.telefono }</span>
        </div>
        <div className="tienda-ficha-prop-item mail">
            <strong>{ LangsString.emailTxt[props.lang] }</strong>
            <a href="mailto:web@picnegre.com" className="orange_link">{ props.tienda.email }</a>
        </div>
        <div className="tienda-ficha-prop-item reloj">
            <strong>{ LangsString.horariosTxt[props.lang] }</strong>
            <span dangerouslySetInnerHTML={{ __html: `${props.tienda.horarios}` }} />
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