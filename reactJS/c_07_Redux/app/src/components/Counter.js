import React, { Component } from 'react';

export default class Counter extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      counter: 0
    }
    this.handleAdd = this.handleAdd.bind(this);
  }  

  handleAdd () {
    this.setState({
      counter: this.state.counter + 1
    });
    this.props.onAdd();
  }

  render () {
    return (
      <div>
          <h1>{this.state.counter}</h1>
          <a onClick={this.handleAdd} className='btn-floating btn-large waves-effect waves-light red'>
            <i className="material-icons">add</i>
          </a>
       </div> 
    );
  }
  
}