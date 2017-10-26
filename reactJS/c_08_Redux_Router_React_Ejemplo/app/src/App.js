import React from 'react';
import { createStore } from 'redux';
import { searcher } from './reducers';
import { Provider } from 'react-redux';
import { Searcher, Teacher } from './containers';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch
} from 'react-router-dom';

let store = createStore(searcher); // Creamos nuestro store en el punto de entrada de la app pasandole el reducer

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/teacher/:id' component={Teacher} />
        <Route path='/' component={Searcher} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
