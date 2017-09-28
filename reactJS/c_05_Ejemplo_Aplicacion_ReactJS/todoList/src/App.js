import React, { Component } from 'react'
import { TodoList } from './TodoList'
import './App.css'

//  npm install lscache --save-dev
//  es una libreria para usar el Local Storage
import lscache from 'lscache'

export default class App extends Component {
  constructor(...args) {
    super(...args)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      items: [],
      text: ''
    }
  }

  componentDidMount () {
    //  Empezamos a usar lscache (localstorage) una vez que el componente se haya montado ya que el local storage es 
    //  un metodo del navegador que es sincrono. Por ejemplo, lo que podria suponer el bloqueo del componente si lo  
    //  usamos en el constructor, ya que tardaria en renderizarse dado que estaria esperando a tener el item.
    // De esta forma, renderizamos el componente y luego buscamos la info en el local storage. Cuando la tengamos, 
    // volveremos a renderizar el componente
    const items = lscache.get('todo-items') || []
    this.setState({ items: items })
    console.log('ComponentDidMount, items: ', items)
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    )
  }

  handleChange(e) {
    this.setState({text: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    var newItem = {
      text: this.state.text,
      id: Date.now()
    }
    this.setState((prevState) => {
      const items = prevState.items.concat(newItem)
      lscache.set('todo-items', items)
      return {
        items: items,
        text: ''
      }
    })
  }
}
