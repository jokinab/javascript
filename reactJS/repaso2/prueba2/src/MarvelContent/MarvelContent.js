import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MarvelList from './MarvelList/MarvelList';
import NewMarvel from './NewMarvel/NewMarvel';
import {LangsString} from './../lang/Lang';

const TodoMenuOptions = Object.keys(LangsString.MarvelContentMenuOptions);

const Button = (props) => (
  <button className={props.selected} key={props.index} onClick={props.onClick}>{props.text}</button>
)

export default class MarvelContent extends Component {
  
  constructor (...args) {
    super(...args)

    this.state = {
      selectedOption: TodoMenuOptions[0],
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
        <div className="container-body">
        <h2>{ LangsString.TodoContentTitle[this.props.currentLanguage] }</h2>
          <header className="head-cnt">
            {TodoMenuOptions.map(
              (item, index) => (
                <Button
                  key={index}
                  text={LangsString.MarvelContentMenuOptions[item][this.props.currentLanguage]}
                  selected={item === this.state.selectedOption ? 'active' : ''}
                  onClick={e => this.changeOption(item)}
                />
              )
            )}
          </header>
          <div className="option-wrap">
            { this.state.selectedOption === 'NewMarvel' && 
              <NewMarvel languages={this.props.languages} 
                      currentLanguage={this.props.currentLanguage}
                      onNeWMessage={this.handleNewMessage}
                      handleFormSubmit = {this.handleFormSubmit} />
            }  
            { this.state.selectedOption === 'MarvelList' && 
              <MarvelList todoList={this.state.todoList} messageEmpty={LangsString.ListEmpty[this.props.currentLanguage]} currentLanguage={this.props.currentLanguage}/>
            }      
          </div>
        </div>  
      </div>
    )
  }
}

MarvelContent.propTypes = {
  currentLanguage: PropTypes.string,
  languages: PropTypes.array,
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
}
