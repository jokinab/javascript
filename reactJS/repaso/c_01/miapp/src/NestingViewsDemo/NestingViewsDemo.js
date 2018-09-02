import React, { Component } from 'react';

export default class NestingViewsDemo extends Component {
  render() {
    return (
      <div className="nestingviewsdemo">
        { this.props.children }
      </div>
    )
  }
}
