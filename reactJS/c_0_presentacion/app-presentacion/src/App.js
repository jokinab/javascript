import React, { Component } from 'react';


class App extends Component {

  constructor (...args) {
    super(...args);
    this.state = {  contador: 0 };
  }  
  
  addContador() {
    this.setState( { contador : this.state.contador + 1 } ) ;
  }
  
  redContador() {
    this.setState( { contador : this.state.contador - 1 } ) ;
  }
  
  render() {
    return (
      <div className="App">
          <button onClick={ () => this.addContador() }>+</button>
          <button onClick={ () => this.redContador() }>-</button>  
          <span>Contador: { this.state.contador }</span>
      </div>
    );
  }
}

export default App;
