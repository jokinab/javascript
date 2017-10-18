import React, { Component } from 'react';
import Proptypes from 'prop-types';

export const Counter = ({ counter, onAdd }) => (
  <div>
    <h1>{counter}</h1>
    <a onClick={onAdd} className='btn-floating btn-large waves-effect waves-light red'>
      <i className="material-icons">add</i>
    </a>
  </div>
);

Counter.Proptypes = {
  onAdd: Proptypes.func,
  counter: Proptypes.number
}
