import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList/TodoList';
import NewTodo from './NewTodo/NewTodo';

const TodoMenuOptions = ['NewTodo', 'TodoList'];

const Button = (props) => (
  <button className={props.selected} key={props.index} onClick={props.onClick}>{props.text}</button>
)



export default class TodoContent extends Component {
  
  constructor (...args) {
    super(...args)

    this.state = {
      title:  {  
                'es': 'Contenido de Todo',
                'eus': 'Todoaren edukia',
                'en': 'Todo Content'
              },
      selectedOption: 'NewTodo',
      todoList: []            
    }
    this.changeOption = this.changeOption.bind(this);
  }

  changeOption (item) {
    this.setState({selectedOption: item});
  }
  
  render() {
    return (
      <div className="todocontent">
        <h2>{ this.state.title[this.props.currentLanguage] }</h2>
        <header className="head-cnt">
          {TodoMenuOptions.map(
            (item, index) => (
              <Button
                key={index}
                text={item}
                selected={item === this.state.selectedOption ? 'active' : ''}
                onClick={e => this.changeOption(item)}
              />
            )
          )}
        </header>
        <div className="option-wrap">
          { this.state.selectedOption === 'NewTodo' && 
            <NewTodo />
          }  
          { this.state.selectedOption === 'TodoList' && 
            <TodoList todoList={this.state.todoList}/>
          }      
        </div>
      </div>
    )
  }
}

TodoContent.propTypes = {
  currentLanguage: PropTypes.string
}
