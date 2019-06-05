import React from 'react';

const Button = (props) => {
  
  return (
    <button onClick={()=>props.clickButton()} value={props.counter}>{props.counter} Clicks</button>
  )
  
}

export default Button