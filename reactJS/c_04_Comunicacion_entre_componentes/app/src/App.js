import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import TitleComponent from './components/titleComponent'
import Form from './components/formComponent'
import Notes from './components/notesComponent'

export default class App extends Component {
  constructor (...args) {
    super(...args)

    this.state = {
      name: 'Jokin',
      language: 'es',
      highLight: false,
      notesTitle: 'Notes',
      notes: [
        'Mi primera nota'
      ]
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
    this.handleHighLightChange = this.handleHighLightChange.bind(this)
  }

  handleNameChange (event) {
    this.setState({ name: event.target.value })
  }

  handleLanguageChange (event) {
    this.setState({language: event.target.value})
  }

  handleHighLightChange (event) {
    this.setState({highLight: event.target.checked})
  }

  render () {
    return (
      <div className='demo'>
        <header className='header'>
          <img src={logo} className="App-logo" alt="logo" />
          <TitleComponent
            title={this.state.name}
            language={this.state.language}
          />
        </header>
        <div className="main">
          <Form
            name={this.state.name}
            language={this.state.language}
            highLight={this.state.highLight}
            handleNameChange={this.handleNameChange}
            handleLanguageChange={this.handleLanguageChange}
            handleHighLightChange={this.handleHighLightChange}
          />
        </div>
        <div className='sidebar'>
          <Notes
            title={this.state.notesTitle}
          />
        </div>
      </div>
    )
  }
}
