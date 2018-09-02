import React, { Component } from 'react';

const Item = (props) => {
  return ( 
    <li className='link-item'>
      <a href={`#{props.link}`}>{props.text}</a>
    </li>
  )  
}

const List = (props) => {
  return (
    <div>
      <ul>{props.children}</ul>
      <span>Number of items: {props.children.length}</span>
    </div>
  )
} 

const Article = (props) => {
  return (
    <article>
      <h4>{props.title}</h4>
      {props.children}
    </article>
  )
}

export default class NestingViewsDemo extends Component {
  render() {
    return (
      <div>
        <List show={false}>
          <Item link='1' text='Item-1' />
          <Item link='2' text='Item-2' />
          <Item link='3' text='Item-3' />
          <Item link='4' text='Item-4' />
        </List>
        <Article title='Title art'>
          <p>Primer parrafo del articulo</p>
          <p>Segundo parrafo del articulo</p>
        </Article>
      </div>
    )
  }
}
