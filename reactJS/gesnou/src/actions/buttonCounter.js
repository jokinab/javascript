import * as types from './actionTypes';

export const increaseCounter = () => {
  return {
    type: types.INCREASE_COUNTER,
  }
}

export const decrementCounter = () => {
  return {
    type: types.DECREMENT_COUNTER,
  }
}