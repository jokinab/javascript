import React from 'react';
import PropTypes from 'prop-types';
import TiendaFicha from './../tiendaFicha/TiendaFicha';
import { LangsString } from '../../lang/Lang';

const TiendasFromSector = (props) => {

  let tiendas = [];

  if ( props.sector.tiendas.length > 0  ) {
    props.sector.tiendas.map( tienda => tiendas.push(tienda) )
  }

  let tiendasUnique = Array.from(new Set(tiendas.map( s => s.id)))
    .map(id => {
      return {
        id: id,
        nombre: tiendas.find( s => s.id === id).nombre,
        images: tiendas.find( s => s.id === id).images,
        direccion: tiendas.find( s => s.id === id).direccion,
        direccion2: tiendas.find( s => s.id === id).direccion2,
        coordX: tiendas.find( s => s.id === id).coordX,
        coordY: tiendas.find( s => s.id === id).coordY,
        linkMap: tiendas.find( s => s.id === id).linkMap,
        telefono: tiendas.find( s => s.id === id).telefono,
        email: tiendas.find( s => s.id === id).email,
        horarios: tiendas.find( s => s.id === id).horarios
      }
    });
  
  let selectedEstacion = props.estacionNombre !== '' ? `${props.estacionNombre} / ` : ''; 
  
  let textEstacion = `<strong>${selectedEstacion}${props.sector.nombre}</strong>`;
   
  return (
    <div className="tiendas-wrap-container">
      <div className="tiendas-from-estacion-wrap">
        <p className="tiendas-ficha-message"  dangerouslySetInnerHTML={{ __html: `${LangsString.tiendasDeTxt[props.lang].replace("%s", textEstacion )}` }} />
        <p className="tiendas-ficha-message-sub">{ LangsString.tiendasDeTxt2[props.lang] }</p>
      </div>  
      <div className="tiendas-from-estacion-cnt">
          {
            tiendasUnique.length > 0 && tiendasUnique.map( ( tienda, index ) => {
              return <TiendaFicha key={index} tienda={tienda} lang={props.lang}/>
            } )
          } 
      </div>  
    </div>  
  )
  
}

TiendasFromSector.propTypes = {
  sector: PropTypes.object,
  estacionNombre: PropTypes.string
}

export default TiendasFromSector;