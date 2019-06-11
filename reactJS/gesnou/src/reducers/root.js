import { combineReducers } from 'redux';
import { counterReducer } from './buttonCounter.js';
import { headerReducer } from './headerReducer.js';

const rootReducer = combineReducers({
  counterReducer,
  headerReducer
});

export default rootReducer;
