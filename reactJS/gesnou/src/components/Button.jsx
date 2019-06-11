import React from 'react';
import './button.css'

const Button = (props) => {
  
  return (
    <button onClick={()=>props.clickButton()} value={props.counter} className={`button ${props.color}`}>{props.sign}</button>
  )
  
}

export default Button