import React from 'react';
import PropTypes from 'prop-types';

const Marquee = (props) => {

  return (
    <div className="marquee-wrap">
      <div className="marquee">
        <div dangerouslySetInnerHTML={{ __html: `${props.text}` }} />  
      </div>  
    </div>  
  )
  
}

Marquee.propTypes = {
  text: PropTypes.string
}

export default Marquee;