import React from 'react';

const Button = (props) => {
  
  return (
    <div>
      <button onClick={()=>props.clickButton(props.counter)} value={props.counter}>{props.counter} Clicks</button>
    </div>
  )
  
}

export default Button