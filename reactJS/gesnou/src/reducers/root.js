import { combineReducers } from 'redux';
import { increaseCounter } from './buttonCounter.js';

const rootReducer = combineReducers({
  increaseCounter
});

export default rootReducer;
