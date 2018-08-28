import React, { Component } from 'react'

export default class LyfeCicleDemo extends Component {  

  constructor (...args) {
    super(...args)

    this.changeState = this.changeState.bind(this)

    this.state = {
      mensaje: 'Mensaje Inicial'
    }
    console.log('<LifeCycleDemo> constructor')
  }

  componentWillMount () {
    console.log('<LifeCycleDemo> componentWillMount')
  }

  componentDidMount () {
    console.log('<LifeCycleDemo> componentDidMount')
  }

  shouldComponentUpdate (nextProps) {
    console.log('<LifeCycleDemo> shouldComponentUpdate')
    return this.props.sizeMessage !== nextProps.sizeMessage
  }

  componentWillReceiveProps (nextProps) {
    console.log('<LifeCycleDemo> componentWillReceiveProps', nextProps)
  }

  componentWillUpdate () {
    console.log('<LifeCycleDemo> componentWillUpdate')
  }

  componentDidUpdate () {
    console.log('<LifeCycleDemo> componentDidUpdate')
  }

  componentWillUnmount () {
    console.log('<LifeCycleDemo> componentWillUnmount')
  }

  changeState () {
    this.setState({mensaje: 'Mensaje Actualizado!'})
  }
  render () {
    console.log('<LifeCycleDemo> render')
    return (
      <div className="lyfecicledemo">
        <p><strong>Props: </strong>{ JSON.stringify(this.props) }</p>
        <p><strong>State: </strong>{ JSON.stringify(this.state) }</p>
        <button onClick={this.changeState}>Change State!</button>
      </div>
    )
  }
}
