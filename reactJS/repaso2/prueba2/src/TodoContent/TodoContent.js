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
      text: {
              TodoContentTitle:  {  
                'es': 'Contenido de Todo',
                'eus': 'Todoaren edukia',
                'en': 'Todo Content'
              },
              NewTodoTitle:  {  
                'es': 'Nuevo Mensaje',
                'eus': 'Mezu Berria',
                'en': 'New Message'
              },
              FormLabelName: {
                'es': 'Nombre: ',
                'eus': 'Izena: ',
                'en': 'Name: '
              },
              FormLabelSurname: {
                'es': 'Apellidos: ',
                'eus': 'Abizenak: ',
                'en': 'Name: '
              },
              FormLabelLanguages: {
                'es': 'Idiomas: ',
                'eus': 'Hizkuntzak: ',
                'en': 'Languages: '
              }, 
              FormLabelPokemon: {
                'es': 'Pokemon: ',
                'eus': 'Pokemon: ',
                'en': 'Pokemon: '
              },
              ListEmpty: {
                'es': 'Ups! La lista está vacia!',
                'eus': 'Ups! Zerrenda hutsik dago!',
                'en': 'Ups! List is empty!'
              }
            },  
      selectedOption: 'NewTodo',
      todoList: [],
      newMessage: {}            
    }
    this.changeOption = this.changeOption.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  changeOption (item) {
    this.setState({selectedOption: item});
  }

  handleNewMessage (newMessage) {
    const currentTodoList = this.state.todoList;
    currentTodoList.push(newMessage);
    this.setState({todoList: currentTodoList});
  }

  handleFormSubmit (message) {
    const currentTodoList = this.state.todoList;
    currentTodoList.push(message);
    this.setState({todoList: currentTodoList});
    console.log(message);
  }
  
  render() {
    return (
      <div className="todocontent">
        <h2>{ this.state.text.TodoContentTitle[this.props.currentLanguage] }</h2>
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
            <NewTodo title={this.state.text.NewTodoTitle[this.props.currentLanguage]}
                     languages={this.props.languages} 
                     currentLanguage={this.props.currentLanguage}
                     onNeWMessage={this.handleNewMessage}
                     handleFormSubmit = {this.handleFormSubmit} />
          }  
          { this.state.selectedOption === 'TodoList' && 
            <TodoList todoList={this.state.todoList} messageEmpty={this.state.text.ListEmpty} currentLanguage={this.props.currentLanguage}/>
          }      
        </div>
      </div>
    )
  }
}

TodoContent.propTypes = {
  currentLanguage: PropTypes.string,
  languages: PropTypes.array
}
