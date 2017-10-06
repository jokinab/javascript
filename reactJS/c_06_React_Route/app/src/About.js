import React, { Component } from 'react'

export default class About extends Component {
  constructor (...args) {
    super(...args)

    this.state = {
      name: 'Jokin'
    }
  }

  render () {
    return (
      <div className='about'>
        <div className="main">
          <p className='text'>{this.state.name}</p>
          <p className='text'>{console.log(this.props)}</p>
        </div>
      </div>
    )
  }
}
