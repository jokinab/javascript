import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class LifeCycleDemo extends Component {
  constructor (...args) {
    super(...args)

    this.changeState = this.changeState.bind(this)

    this.state = {
      mensaje: this.props.initialMessage
    }

    console.log('%c <LifeCycleDemo> constructor', 'color:green')
  }

  componentWillMount () {
    console.log('%c <LifeCycleDemo> ComponentWillMount', 'color:green')
  }

  componentDidMount () {
    console.log('%c <LifeCycleDemo> ComponentDidMount', 'color:green')
    this.interval = setInterval(() => {
      console.log('go!')
    }, 100)
  }

  componentWillReceiveProps (nextProps) {
    console.log('<LifeCycleDemo> componentWillReceiveProps', nextProps)
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log('%c <LifeCycleDemo> shouldComponentUpdate', 'color:green')
    console.log('\t-actualProps ', this.props.sizeMessage)
    console.log('\t-nextProps', nextProps.sizeMessage)
    console.log('\t-actualState', this.state.mensaje)
    console.log('\t-nextState', nextState.mensaje)
    return (this.props.sizeMessage !== nextProps.sizeMessage) || (this.state.mensaje !== nextState.mensaje)
  }

  componentWillUpdate () {
    console.log('%c <LifeCycleDemo> componentWillUpdate', 'color:green')
  }

  componentDidUpdate () {
    console.log('%c <LifeCycleDemo> componentDidUpdate', 'color:green')
  }

  componentWillUnmount () {
    /* console.log('%c <LifeCycleDemo> componentWillUnmount', 'color:green') */
  }

  changeState () {
    this.setState({ mensaje: 'Mensaje actualizado!' })
  }

  render () {
    console.log('%c <LifeCycleDemo> render', 'color:green')
    return (
      <div>
        <h1>Life Cycle Demo</h1>
        <p><strong>State: </strong><code>{JSON.stringify(this.state)}</code></p>
        <p><strong>Props: </strong><code>{JSON.stringify(this.props)}</code></p>
        <button onClick={this.changeState}>Change conponent state</button>
      </div>
    )
  }
}

ReactDOM.render(
  <LifeCycleDemo sizeMessage='12' initialMessage='Mensaje Inincial! Pasado como propiedad!'/>,
  document.getElementById('root')
)
