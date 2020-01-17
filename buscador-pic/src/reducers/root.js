import { combineReducers } from 'redux';
import { buscadorSki } from './ski/estacionesList';
import { buscadorBici } from './bici/estacionesList';

import { buscador } from './buscador/buscador';

const rootReducer = combineReducers({
  buscadorSki, buscadorBici, buscador
});

export default rootReducer;