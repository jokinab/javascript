import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { langs } from "./../Lang/langs";

export default class Body extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      name: this.props.currentLang,
      lang: ''
    }
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
    console.log('\t-actualProps ', this.props.currentLang)
    console.log('\t-nextProps', nextProps.currentLang)
    console.log('\t-actualState', this.state.currentLang)
    console.log('\t-nextState', nextState.currentLang)
    return (this.props.currentLang !== nextProps.currentLang) || (this.state.currentLang !== nextState.currentLang)
  }

  componentWillUpdate (nextProps) {
    this.setState({currentLang: nextProps.currentLang});
    console.log('%c <LifeCycleDemo> componentWillUpdate', 'color:green')
  }

  componentDidUpdate () {
    console.log('%c <LifeCycleDemo> componentDidUpdate', 'color:green')
  }

  componentWillUnmount () {
    /* console.log('%c <LifeCycleDemo> componentWillUnmount', 'color:green') */
     clearInterval(this.interval);
  }

  render() {
    return (
      <div className="Body">
        <h1> {this.state.currentLang}</h1>
        { this.props.currentLang }
      </div>
    )
  }
}

Body.propTypes = {
  currentLang: PropTypes.string,
}

