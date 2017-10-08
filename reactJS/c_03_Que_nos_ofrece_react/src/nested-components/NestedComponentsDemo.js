import React, { Component } from 'react'

function Item (props) {
  return <li><a href={`#${props.link}`}>{props.text}</a></li>
}

function List (props) {
  console.log('Children', props.children)
  return (
    <div>
      <ul>{props.children}</ul>
      <span>Number of items: {props.children.length}</span>
    </div>
  )
}

function Article (props) {
  return (
    <article>
      <h4>{props.title}</h4>
      {props.children}
    </article>
  )
}

export class NestedComponentsDemo extends Component {
  render () {
    return (
      <div>
        <h1>Nested Components Demo</h1>
        <List>
          <Item key='1' link='1' text='Item 1' />
          <Item key='2' link='2' text='Item 2' />
          <Item key='3' link='3' text='Item 3' />
          <Item key='4' link='4' text='Item 4' />
        </List>
        <Article title='Titulo del Articulo'>
          <p>En un lugar de la Mancha, de cuyo nombre no quiero acordarme...</p>
          <p>Vivia un joven bla bla bla...</p>
        </Article>
      </div>
    )
  }
}
