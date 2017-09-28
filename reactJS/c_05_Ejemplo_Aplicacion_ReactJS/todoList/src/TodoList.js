import React, { Component } from 'react'

/*
export default class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    )
  }
}


export function TodoList (props) {

} 
*/

export const TodoList = (props) => (
  <ul>
    {props.items.map(item => (
      <li key={item.id}>{item.text}</li>
    ))}
  </ul>
)
