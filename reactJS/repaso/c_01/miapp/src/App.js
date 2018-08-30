import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import LyfeCicleDemo from './LyfeCicleDemo/LyfeCicleDemo'

import DinamicChildrenDemo from './DinamicChildrenDemo/DinamicChildrenDemo'

class App extends Component {
  constructor (...args) {
    super(...args)

    this.state = {
      demoToLoad: ''
    }
    this.demoToLoad = this.demoToLoad.bind(this)
  }

  demoToLoad (...args) {
    console.log(args)
    this.setState({ demoToLoad: args[0] })
  }

  render () {
    const demoSelected = this.state.demoToLoad
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button
          className={this.state.demoToLoad === '' ? 'active' : '' }
          onClick={ () => this.demoToLoad('') }>Empty</button>
        <button
          className={this.state.demoToLoad === 'LyfeCicleDemo' ? 'active' : '' }
          onClick={ () => this.demoToLoad('LyfeCicleDemo') }>LyfeCicleDemo</button>
        <button
          className={this.state.demoToLoad === 'DinamicChildrenDemo' ? 'active' : '' }
          onClick={ () => this.demoToLoad('DinamicChildrenDemo') }>DinamicChildrenDemo</button>
    
        { (demoSelected === 'LyfeCicleDemo') && <LyfeCicleDemo /> }
        { (demoSelected === 'DinamicChildrenDemo') && <DinamicChildrenDemo initialshow='false'/> }
      </div>
    )
  }
}

export default App
