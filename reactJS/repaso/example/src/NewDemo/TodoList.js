import React, { Component } from 'react';
import PropTypes from 'prop-types';

const InputFilter = (props) => {
  return (
    <input onChange={props.onChange} value={props.textFilter} />
  )
}

const ListTodo = (props) => {
  return (
    <ul>{props.children}</ul>
  )
}

const ListItem = (props) => {
  console.log(props)
  return (
    <li className={props.elemValue.highlight === true ? 'highlighted' : ''}>
      <h3>Name: {props.elemValue.name}</h3>
      <h4>Lang: {props.elemValue.selectedLang}</h4>
      <p>Note: {props.elemValue.note}</p>
    </li>
  )
}



export default class TodoList extends Component {
  constructor (...args) {
    super(...args);
    this.state = {
      filter: ''
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }
  
  handleFilterChange (e) {
    let filterText = e.target.value;
    this.setState({filter: filterText});
  }
  
  render () {
    console.log('filter: ', this.state.filter);
    const filtrado = this.props.messagesList.filter((elem) => elem.name.includes(this.state.filter));
   
    
    return (
      <div className='todo-wrap'>
        <InputFilter onChange={this.handleFilterChange} textFilter={this.state.filter} />
        <ListTodo>
          { 
            
            filtrado.map((elem, index) => {  
              return (<ListItem key={index} elemValue={elem}/>);
            })
          }
        </ListTodo>
      </div>
    )
  }
}
