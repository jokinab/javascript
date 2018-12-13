import { combineReducers } from 'redux';
import header from './header';
import { fetchMarvelItems } from './marvelList';


const rootReducer = combineReducers({
  header,
  fetchMarvelItems
});

export default rootReducer;
