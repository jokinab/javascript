import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Contador} from './contador'

class DebuggerFunction extends React.Component {
  stopAlways () {
    console.log('Stop Always!')
  }

  stopConditional () {
    const value = Math.floor(Math.random() * 2)
    console.log('value: ', value)
    console.log('Stop Conditional Value: ' + value)
  }

  stopDisabled () {
    console.log('Stop Disabled!')
  }

  render () {
    return (
      <div className='botones'>
        <button onClick={this.stopAlways}>Stop always!</button>
        <button onClick={this.stopConditional}>Stop conditional!</button>
        <button onClick={this.stopDisabled}>Stop disbled!</button>
      </div>
    )
  }
}

// Si solo se va a retornar un elemento en un componente stateless
// la arrow function lo permite hacer en linea, sin especificar return
const HelloWorld = (props) => <h1>{props.heading}</h1>

// Si se va a retornar más de un elemento en un componente stateless
// la arrow function lo permite hacer especificando el return
const Gatito = (props) => {
  return (
    <div className='elemento'>
      <img src={props.img} />
      <small>{props.caption}</small>
      <HelloWorld {...props} />
    </div>
  )
}

ReactDOM.render(
  <Gatito 
    heading='Hello from props!'
    img="http://www.animalesyanimales.com/wp-content/uploads/2009/04/20081102164739-fotos-gatos.jpg" 
    caption={'Foto de gatito'}
  />,
  document.getElementById('app')
)

ReactDOM.render(
  <DebuggerFunction
  />,
  document.getElementById('app2')
)

ReactDOM.render(
  <Contador
  />,
  document.getElementById('app3')
)