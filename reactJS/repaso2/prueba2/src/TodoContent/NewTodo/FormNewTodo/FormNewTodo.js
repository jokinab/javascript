import React, { Component } from 'react';
import PropTypes from 'prop-types';

const InputName = (props) => {
  return (
    <div>
      <label className="newLabel">Nombre: </label>
      <input className="newInput" type="text" value={props.name} onChange={props.handleOnChangeName} />
    </div>
  )
}

InputName.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func
}

const InputSurname = (props) => {
  return (
    <div>
      <label className="newLabel">Apellidos: </label>
      <input className="newInput" type="text" value={props.name} onChange={props.handleOnChangeSurname} />
    </div>
  )
}

InputSurname.propTypes = {
  name: PropTypes.string
}


const InputMessage = (props) => {
  return (
    <div>
      <label className="newLabel">Mensaje: </label>
      <input className="newInput" type="textarea" value={props.name} onChange={props.handleChangeMessage} />
    </div>
  )
}

InputMessage.propTypes = {
  name: PropTypes.string,
  handleChangeMessage: PropTypes.func
}


const SelectLang = (props) => {
  return (
    <div>
      <label className="newLabel">Language: </label>
      <select value={props.currentLanguage} className="lang-list" onChange={props.handleLangChange}>
          {props.languages.map((langItem, index) => {
            return (
              <option value={ langItem } key={index}>{langItem}</option>
            );          
          } )}
        </select>
    </div>
  )
}

SelectLang.propTypes = {
  name: PropTypes.string,
  currentLanguage: PropTypes.string,
  handleLangChange: PropTypes.func
}

export default class FormNewTodo extends Component {
  constructor (...args) {
    super (...args);
    this.state = {
      name: '',
      surname: '',
      message: '',
      language: this.props.currentLanguage,
      pokemon: {
        id: '',
        href: '',
        img: '',
        name: ''
      }
    }
    this.handleOnChangeName = this.handleOnChangeName.bind(this);
    this.handleOnChangeSurname = this.handleOnChangeSurname.bind(this);
    this.handleLangChange = this.handleLangChange.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleOnChangeName (event) {
    this.setState({name: event.target.value});
  }

  handleOnChangeSurname (event) {
    this.setState({surname: event.target.value});
  }

  handleLangChange (event) {
    this.setState({language: event.target.value});
  }

  handleChangeMessage (event) {
    this.setState({message: event.target.value});
  }

  handleFormSubmit (event) {
    
    event.preventDefault();

    const message = {
      name: this.state.name,
      surname: this.state.surname,
      language: this.state.language,
      message: this.state.message
    };

    this.props.handleFormSubmit(message);
  
  }


  render() {
    return (
      <form className="formnewtodo">
        <InputName name={this.state.name} handleOnChangeName={this.handleOnChangeName} />
        <InputSurname name={this.state.surname} handleOnChangeSurname={this.handleOnChangeSurname} />
        <SelectLang currentLanguage={this.state.language} 
                    languages={this.props.languages} 
                    handleLangChange={this.handleLangChange} />
        <InputMessage name={this.state.message} handleChangeMessage={this.handleChangeMessage} />   
        <button type='submit' onClick={this.handleFormSubmit}>Enviar</button>         
      </form>
    )
  }
}

FormNewTodo.propTypes = {
  languages: PropTypes.array,
  currentLanguage: PropTypes.string,
  handleFormSubmit: PropTypes.func
}