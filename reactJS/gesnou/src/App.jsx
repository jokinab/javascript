import React, { useState } from 'react';

import Button from './Button.jsx'

import './App.css'

const App = () => {
  
  const [count, setCount] = useState(0)

  const handleButtonClick = (n) => setCount(n+1)

  return (
    <div>
      <Button clickButton={handleButtonClick} counter={count} />     
    </div>
  )

}

export default App