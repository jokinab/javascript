import React, { Component } from 'react';
import Logo from './logo';
import dummyData from './dummyData';
import './App.css';
import Card from './Card';

export default class App extends Component {
  constructor (...args) {
    super(...args);
    this.state = {
      results: dummyData,
      textToSearch: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCLick = this.handleClick.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    console.log('Submit!');
  }

  handleChange (event) {
    this.setState({textToSearch: event.currentTarget.value}, () =>
      console.log('Texto con el nuevo estado: ', this.state.textToSearch)
    );
  }

  handleClick (event) {
    console.log('Button clicked');
  }

  render () {
    return (
      <div className='container'>
        <Logo isCentered={true} />

        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} type='text' />
          <button onClick={this.handleClick}>Go!</button>
        </form>

        <div className='results'>
          {this.state.results.map(item => <Card item={item} key={item.id}/>)}
        </div>
      </div>
    );
  }
}
