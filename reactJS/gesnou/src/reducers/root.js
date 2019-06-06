import { combineReducers } from 'redux';
import { increaseCounter } from './buttonCounter.js';
import { headerReducer } from './headerReducer.js';

const rootReducer = combineReducers({
  increaseCounter,
  headerReducer
});

export default rootReducer;
