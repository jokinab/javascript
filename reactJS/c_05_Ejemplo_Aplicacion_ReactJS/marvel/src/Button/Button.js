import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Spinner from 'react-spinkit';

export default function Button (props) {
  return (
    <button>{
      props.isLoading 
        ? <Spinner name="line-scale-pulse-out-rapid" noFadeIn color="white"/>
        : props.label
    }</button>
  )
}

Button.PropTypes = {
  label: PropTypes.string,
  isLoading: PropTypes.bool
};
