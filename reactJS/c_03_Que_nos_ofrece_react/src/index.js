import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { LifeCycleDemo } from './life-cycle/LifeCycleDemo'
import { DinamicChildsDemo } from './dinamic-childs/DinamicChilds'
import { NestedComponentsDemo } from './nested-components/NestedComponentsDemo'
import { EncapsulatingLibrariesDemo } from './encapsulating-libraries/EncapsulatingLibrariesDemo'

const DemoList = ['LifeCycleDemo', 'DinamicChildsDemo', 'NestedComponentsDemo', 'EncapsulatingLibrariesDemo']

const Button = (props) => (
  <button className={props.selected} key={props.index} onClick={props.onClick}>{props.text}</button>
)

class App extends Component {
  constructor (...args) {
    super(...args)
    this.state = {
      selectedOption: this.props.defaultDemo
    }
  }

  changeOption (item) {
    this.setState({selectedOption: item})
  }

  render () {
    return (
      <div>
        <h1 className='main-title'>Wellcome to Demo</h1>
        <header className='header'>
          {DemoList.map(
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
        <main>
          { this.state.selectedOption === 'LifeCycleDemo' &&
            <LifeCycleDemo sizeMessage='12' initialMessage='Mensaje Inincial! Pasado como propiedad!' />
          }
          { this.state.selectedOption === 'DinamicChildsDemo' &&
            <DinamicChildsDemo initialshow={false} />
          }
          { this.state.selectedOption === 'NestedComponentsDemo' &&
            <NestedComponentsDemo />
          }
          { this.state.selectedOption === 'EncapsulatingLibrariesDemo' &&
            <EncapsulatingLibrariesDemo />
          }
        </main>
      </div>
    )
  }
}

ReactDOM.render(
  <App defaultDemo='DinamicChildsDemo' />,
  document.getElementById('root')
)
