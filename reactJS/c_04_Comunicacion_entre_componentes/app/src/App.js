import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logo from './logo.svg'
import './App.css'
/* 
Comunicacion padres a hijos
  Por medio de props
  PropTypes sirve para validar las propiedades pasadas a los hijos. https://facebook.github.io/react/docs/typechecking-with-proptypes.html
  Se pueden hacer que las propiedades sean reuired por medio de la la validacion de las propiedades.
*/
class TitleComponent extends Component {
  static get propTypes () {
    return {
      title: PropTypes.string.isRequired,
      logo: PropTypes.string
    }
  }

  render () {
    return (
      <div className="App">
        <img src={this.props.logo} className="App-logo" alt="logo" />
        <h1>{`Hello ${this.props.title}!`}</h1>
      </div>
    )
  }
}
/* 
TitleComponent.propTypes = {
  title: PropTypes.number,
  logo: PropTypes.string
}
 */
export default class App extends Component {
  render () {
    return <TitleComponent title='World' logo={logo} />
  }
}
