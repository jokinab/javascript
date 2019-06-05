import * as types from './actionTypes';

export const increaseCounter = (counter) => {
  console.log('valor en el action: ',counter)
  return {
    type: types.INCREASE_COUNTER,
    payload:{
      counter: parseInt(counter) + 1
    }
  }
}