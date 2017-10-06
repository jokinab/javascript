import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import About from './About';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

/*
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
*/

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Demo App</Link></li>
        <li><Link to="/about">About Me</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={App}/>
      <Route path="/about" component={About}/>
    </div>
  </Router>
)

ReactDOM.render(
  <BasicExample />, document.getElementById('root')
);
registerServiceWorker();
