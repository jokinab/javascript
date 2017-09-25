import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import TitleComponent from './components/titleComponent'
import Form from './components/formComponent'

export default class App extends Component {
  render () {
    return (
      <div className='demo'>
        <div className="main">
          <img src={logo} className="App-logo" alt="logo" />
          <TitleComponent title='Jokin' />
          <Form />
        </div>
        <div className='sidebar'>Sidebar</div>
      </div>
    )
  }
}
