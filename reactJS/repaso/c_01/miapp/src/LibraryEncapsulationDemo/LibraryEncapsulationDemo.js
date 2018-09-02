import React, { Component } from 'react';
import Timeago from './Timeago';

function RadioList (props) {
  return (
    <div>
      <h3>Choose an option from following {props.children.length} dates</h3>
      {props.children}
    </div>
  )
}

function RadioButton (props) {
  return (
    <label>
      <input
        checked={props.selectedDate === props.date}
        type='radio'
        value={props.date}
        onChange={props.onChange}
      />
      {props.date}
    </label>
  )
}

export default class LibraryEncapsulationDemo extends Component {
  constructor (...args) {
    super(...args)
    this.state = { date: false }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({ date: e.target.value })
  }

  render () {
    return (
      <div>
        <h1>Encapsulating Libraries Demo</h1>
        <h3>moment.js library encapsulation into a react Component</h3>
        <RadioList>
          <RadioButton
            date='2017-09-24'
            selectedDate={this.state.date}
            onChange={this.handleChange}
          />
          <RadioButton
            date='2016-09-24'
            selectedDate={this.state.date}
            onChange={this.handleChange}
          />
          <RadioButton
            date='2015-09-24'
            selectedDate={this.state.date}
            onChange={this.handleChange}
          />
        </RadioList>
        {this.state.date && <Timeago date={this.state.date} />}
      </div>
    )
  }
}
