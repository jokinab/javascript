import React, { Component } from 'react';
import Proptypes from 'prop-types';
import './searchFilter.css';

class SearchFilter extends Component {
  constructor(...args) {
    super(...args);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.onFilter({
      text: this.input.value
    });
  }

  handleChange (event) {
    console.log(event.target.value);
    this.props.onFilter({
      text: event.target.value
    });
  }

  render () {
    return (
      <form className='search-bar' onSubmit={this.handleSubmit}>
        <input type='search'
          id='searchFilter'
          className='searchFilter'
          ref={ (input) => this.input = input } // refferencia del input para luego, en el Submit, poder acceder a su valor
          onChange={this.handleChange}
          value={this.props.filter}
          required
        />
        <label htmlFor='searchFilter'>SearchFilter</label>
      </form>
    );
  }
};

SearchFilter.Proptypes = {
  onFilter: Proptypes.func,
  filter: Proptypes.string
};

export default SearchFilter;
