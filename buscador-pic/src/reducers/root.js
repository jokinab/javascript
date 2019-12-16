import { combineReducers } from 'redux';
import { buscadorSki } from './ski/estacionesList';

import { selector } from './selector/selector';

const rootReducer = combineReducers({
  buscadorSki, selector
});

export default rootReducer;