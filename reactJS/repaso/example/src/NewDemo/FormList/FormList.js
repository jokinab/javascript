import React, { Component } from 'react';
import PropTypes from 'prop-types';

const NameInput = (props) => {
  console.log('value: ', typeof props.name)
  return (
    <div>
      <label>Name: </label>
      <input type='text' value={props.name} onChange={props.onChange}/>
    </div>
  )
}
NameInput.propTypes = {
  onChange: PropTypes.func.isRequired
}

const SelectLang = (props) => {
  return (
    <div>
      <label>Select a Lang: </label>
      <select value={props.selectedLang} onChange={props.onChange}>
        {props.children}
      </select>
    </div>
  )
}
SelectLang.propTypes = {
  selectedLang: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

const OptionLang = (props) => {
  return (
    <option value={props.value}>{props.value}</option>
  )
}
OptionLang.propTypes = {
  value: PropTypes.string.isRequired
}

const CheckHighLight = (props) => {
  return (
    <div>
      <label>Highlight: </label>
      <input type='checkbox' checked={props.checked} onClick={props.onClick} />
    </div>
  )
}
CheckHighLight.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func
}

const MessageInput = (props) => {
  return (
    <div>
      <label>Message: </label>
      <textarea value={props.note} onChange={props.onChange} />
    </div>
  )
}
MessageInput.propTypes = {
  note: PropTypes.string,
  onChange: PropTypes.func
}

export default class FormList extends Component {
  constructor (...args) {
    super(...args)
    this.state = {
      name: '',
      lang: ['Es', 'En', 'Eu'],
      selectedLang: 'Es',
      highlight: false,
      note: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLangChange = this.handleLangChange.bind(this);
    this.handleHighlight = this.handleHighlight.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  handleNameChange (e) {
    this.setState({name: e.target.value});
  }

  handleLangChange (e) {
    this.setState({selectedLang: e.target.value});
  }

  handleHighlight (e) {
    this.setState({highlight: e.target.checked})
  }

  handleMessageChange (e) {
    this.setState({note: e.target.value});
  }

  render () {
    return (
      <div className="newdemo">
        <NameInput name={this.state.name} onChange={this.handleNameChange}/>
        <SelectLang selectedLang={this.state.selectedLang} onChange={this.handleLangChange}>
          { this.state.lang.map((langItem, index) => {
            return (<OptionLang key={index} value={langItem}>{langItem}</OptionLang>)
          })
          }
        </SelectLang>
        <CheckHighLight onClick={this.handleHighlight} currentValue={this.state.highlight} />
        <MessageInput note={this.state.note} onChange={this.handleMessageChange}/>
      </div>
    )
  }
}