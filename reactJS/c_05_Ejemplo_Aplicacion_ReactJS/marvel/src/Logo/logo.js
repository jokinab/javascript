import React from 'react';
import PropTypes from 'prop-types';
import MarvelLogo from './MarvelLogo.svg';

export default function Logo (props) {
  const className = props.isCentered ? 'has-text-centered' : '';

  return (
    <div className={`logo-container ${className}`}>
      <img src={MarvelLogo} className='App-logo' alt='presentation' />
    </div>
  );
}

Logo.propTypes = {
  isCentered: PropTypes.bool
};
