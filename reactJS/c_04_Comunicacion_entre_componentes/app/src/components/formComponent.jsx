import React from 'react'
import PropTypes from 'prop-types'
import { languages } from '../config'

const LanguageOption = (props) => (
  <option key={props.index} value={props.value}>{props.value}</option>
)

export default function Form (props) {
  return (
    <div>
      <div className='form-field'>
        <label htmlFor='name'>Name: </label>
        <input
          id='name'
          type='text'
          value={props.name}
          onChange={ props.handleNameChange }
        />
      </div>
      <div className='form-field'>
        <label htmlFor='language'>Language: </label>
        <select id='language' onChange={props.handleLanguageChange} defaultValue={props.language}>
          {languages.map((language, index) =>
            <LanguageOption
              value={language}
              key={index}
            />)}
        </select>
      </div>
      <div className='form-field'>
        <label htmlFor='highLight'>HighLight: </label>
        <input
          id='highLight'
          type='checkbox'
          onChange={props.handleHighLightChange}
          defaultChecked={props.highLight}
        />
      </div>
    </div>
  )
}

Form.propTypes = {
  name: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  highLight: PropTypes.bool.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleLanguageChange: PropTypes.func.isRequired,
  handleHighLightChange: PropTypes.func.isRequired
}
