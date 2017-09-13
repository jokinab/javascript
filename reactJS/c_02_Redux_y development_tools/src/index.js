import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class DebuggerFunction extends React.Component {
  onClickar () {
    debugger;
  }

  render() {
    return (
      <button onClick={this.onClickar}>Debuuger!</button>
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
