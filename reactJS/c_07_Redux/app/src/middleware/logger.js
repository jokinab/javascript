// Funcion que recibe un store que devuelve una funcion que recibe un next que devuelve una funcion que recibe un action que devuelve
// una funcion  

export const logger = store => next => action => {
  console.log('Prev. state: ', store.getState());   // Loggeamos el estado previo 
  console.log('Action: ', action);                  // Loogeamos la accion a realizar
  const result = next(action);                      // next ejecutara mi reducer sobre el store y cuando vuelva
  console.log('Next state: ', store.getState());    // Loggeare el nuevo estado 
  return result;                                    // 
}
