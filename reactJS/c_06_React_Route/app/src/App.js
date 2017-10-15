import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import TitleComponent from './components/titleComponent'
import Form from './components/formComponent'
import Notes from './components/notesComponent'
import PropTypes from 'prop-types'
import { languages } from './config/'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


export default class App extends Component {
  constructor (...args) {
    super(...args)

    this.state = {
      name: 'Jokin',
      language: 'es',
      highLight: false,
      notesTitle: 'Notes',
      notes: []
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
    this.handleHighLightChange = this.handleHighLightChange.bind(this)
    this.handleNotesKeyPress = this.handleNotesKeyPress.bind(this)
  }

  getChildContext () {
    return { language: this.props.match.params.language };
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

  handleNotesKeyPress (event) {
    if (event.key === 'Enter') {
      const newNotes = this.state.notes.slice()
      newNotes.push(event.target.value)
      this.setState({notes: newNotes})
    }
  }

  render () {
    return (
      <div className='demo'>
        <div className="main">
          {console.log('parametro recogido de la url: ', this.props.match.params.language)}
          <TitleComponent title='Jokin' />
          <Form
            name={this.state.name}
            language={this.state.language}
            highLight={this.state.highLight}
            handleNameChange={this.handleNameChange}
            handleLanguageChange={this.handleLanguageChange}
            handleHighLightChange={this.handleHighLightChange}
            handleNotesKeyPress={this.handleNotesKeyPress}
          />
        </div>
        <div className='sidebar'>
          <Notes
            title={this.state.notesTitle}
            notes={this.state.notes}
          />
        </div>
      </div>
    )
  }
}


App.childContextTypes = {
  language: PropTypes.oneOf(languages)
};