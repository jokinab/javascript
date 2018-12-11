import * as types from './actionTypes';

export const changeLanguage = (lang) => {
  console.log(lang);
  return {
    type: types.CHANGE_LANGUAGE,
    payload: {
      lang
    }
  };
};
