import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import TitleComponent from './components/titleComponent'
import Form from './components/formComponent'

export default class App extends Component {

  constructor (...args) {
    super(...args)

    this.state = {
      name: 'Jokin',
      language: 'es'
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
  }

  handleNameChange (event) {
    this.setState({ name: event.target.value })
  }

  handleLanguageChange (event) {
    this.setState({language: event.target.value})
  }

  render () {
    return (
      <div className='demo'>
        <div className="main">
          <img src={logo} className="App-logo" alt="logo" />
          <TitleComponent
            title={this.state.name}
            language={this.state.language}
          />
          <Form
            name={this.state.name}
            language={this.state.language}
            handleNameChange={this.handleNameChange}
            handleLanguageChange={this.handleLanguageChange}
          />
        </div>
        <div className='sidebar'>Sidebar</div>
      </div>
    )
  }
}
