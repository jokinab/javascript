import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default function About ({ children }) {
  return (
    <div>
      <h1>Title</h1>
      {children}
    </div>
  );
}

About.propTypes = {
  children: PropTypes.node
};
