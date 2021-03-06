import * as types from '../../actions/buscadorWrap/actionTypes';

// Estado inicial de la aplicacion
const initialState = {
  selected: 'bici',
  showSki: true,
  showBici: true,
  isLoggedIn:false,
  hasInitInfo: false,
  language: 'es',
  userInfo: {
    isFetchingUserInfo: false,
    isFetchingUserInfoErr: false,
    isNotAgencia: true
  } 
};

// Reducer que devuelve el nuevo estado

export const buscador = (state = initialState, action) => {
    
    switch (action.type) {
        case types.SELECT_BUSCADOR_BICI_SKI:
          return {
            ...state,
            selected: action.payload.selected
          }
        case types.FETCHING_USER_INFO:
          return {
            ...state,
            hasInitInfo: false,
            userInfo: {
              ...state.userInfo,
              isFetchingUserInfo: action.payload.isFetchingUserInfo,
              isFetchingUserInfoErr: action.payload.isFetchingUserInfoErr,
            }
          }
        case types.FETCH_USER_INFO_ERROR:
          return {
            ...state,
            hasInitInfo: false,
            userInfo: {
              ...state.userInfo,
              isFetchingUserInfo: action.payload.isFetchingUserInfo,
              isFetchingUserInfoErr: action.payload.isFetchingUserInfoErr,
            }
          }
        case types.FETCH_USER_INFO_SUCCESS:
          // console.log(action.payload.data.userData)
          let newUserInfo = {
            ...state.userInfo,
            ...action.payload.data.userData
          }
          return {
            ...state,
            isLoggedIn: action.payload.data.isLoggedIn,
            showSki: action.payload.data.showSki,
            showBici: action.payload.data.showBici,
            hasInitInfo: true,
            userInfo: newUserInfo,
            selected: action.payload.data.selected,
            language: document.documentElement.lang,
            isNotAgencia: action.payload.data.userData.isNotAgencia
          }  
        default:
          return state;
    }
}