// Dependencias React
import React from 'react'


// Reducers
import rootReducer from './reducers/root.js';

// Containers
import ButtonContainer from './containers/ButtonContainer.jsx'
import HeaderContainer from './containers/HeaderContainer.jsx'

import './App.css'


const App = () => {
  
  return (
    <div>
      <HeaderContainer />
      <ButtonContainer />  
    </div>
  )
}

export default App