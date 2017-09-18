import React, { Component } from 'react'

export class Contador extends Component {
  constructor (...args) {
    super(...args)
    this.state = {contador: 0}
  }

  addContador () {
    this.setState({ contador: this.state.contador + 1 })
  }
  redContador () {
    this.setState({ contador: this.state.contador - 1 })
  }

  save () {
    localStorage.setItem('contador', this.state.contador)
  }
  load () {
    this.setState({contador: parseInt(localStorage.getItem('contador'), 10)})
  }

  render () {
    return (
      <div className="App">
        <h2>Contador</h2>
        <button onClick={ () => this.addContador() }>+</button>
        {/* <button onClick={ this.addContador.bind(this) }>+</button> */}
        <button onClick={ () => this.redContador() }>-</button>
        <button onClick={ () => this.save() }>Save</button>
        <button onClick={ () => this.load() }>-</button>
        <span>Contador: { this.state.contador }</span>
      </div>
    )
  }
}
