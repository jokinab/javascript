import React, { Component } from 'react';

class Titulo extends Component {
  
  render() {
    return (
      <h1>{this.props.mensaje}</h1>
    );  
  }
}

class App extends Component {

  constructor (...args) {
    super(...args);
    this.state = {  mensaje: "Mensaje Inicial!" };
  }  
  
  cambiarTitulo() {
    this.setState( { mensaje : "Mensaje cambiado!" } ) ;
  }
  
  render() {
    return (
      <div className="App">
        <button onClick={ this.cambiarTitulo.bind(this) } >Cambiar el titulo</button>
        <Titulo mensaje = { this.state.mensaje } />
      </div>
    );
  }
}

export default App;
