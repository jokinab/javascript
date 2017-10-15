import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import About from './About';
import registerServiceWorker from './registerServiceWorker';
import { Topics } from './components/Topics';
import { Auth } from './components/Auth';
import TitleComponent from './components/titleComponent';
import logo from './logo.svg'
import  CustomLinkExample  from './components/CustomLinks';

import { 
  BrowserRouter as Router, 
  Route, 
  Link,
  Switch 
} from 'react-router-dom';

/*
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
*/

class BasicExample extends Component {
  constructor (...args) {
    super(...args);

    this.state = {
      name: 'Jokin',
      language: 'es'
    };
  }

  render () {
    return (
      <Router>
        <div>
          <header className='header'>
            <img src={logo} className="App-logo" alt="logo" />
            <TitleComponent
              title={this.state.name}
              language={this.state.language}
            />
            <nav>
              <ul className='nav'>
                <li className='nav-item'><Link to="/">Demo App</Link></li>
                <li className='nav-item'><Link to="/about">About Me</Link></li>
                <li className='nav-item'><Link to="/topics">Topics</Link></li>
                <li className='nav-item'><Link to="/auth">Auth</Link></li>
                <li className='nav-item'><Link to="/custom">Custom</Link></li>
              </ul>
            </nav>
          </header>
          <Switch>
            <Route exact path="/:language" component={App}></Route>
            <Route path="/about" component={About}/>
            <Route path="/topics" component={Topics}/>
            <Route path="/auth" component={Auth}/>
            <Route path="/custom" component={CustomLinkExample}/>
          </Switch>
        </div>

      </Router>
    );
  }
};

ReactDOM.render(
  <BasicExample />, document.getElementById('root')
);
registerServiceWorker();


