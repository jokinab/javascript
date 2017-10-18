import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Counter } from './../components/Counter';
import InputList from './../components/InputList';
import { connect } from 'react-redux';

class ReduxExample extends Component {
  constructor(...args) {
    super(...args);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd () {
    // TODO
  }

  render () {
    return (
      <div>
        <Counter counter={this.props.counter} onAdd={this.handleAdd} />
        <InputList counter={this.props.counter} />
      </div>
    )
  }  
}

const mapStateToProps = (state) => state

const Appli = connect(mapStateToProps)(ReduxExample);

Appli.propTypes = {
  counter: Proptypes.number
}

export default Appli;