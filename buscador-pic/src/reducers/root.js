import { combineReducers } from 'redux';
import { buscadorSki } from './ski/estacionesList';

import { buscador } from './buscador/buscador';

const rootReducer = combineReducers({
  buscadorSki, buscador
});

export default rootReducer;