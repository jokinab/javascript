import * as types from '../../actions/selector/actionTypes';

// Estado inicial de la aplicacion
const initialState = {
  selected: 'ski',
  showSki: true,
  showBici: true,
  isLoggedIn:false,
  hasInitInfo: false,
  userInfo: {
    isFetchingUserInfo: false,
    isFetchingUserInfoErr: false,
    isNotAgencia: true
  } 
};

// Reducer que devuelve el nuevo estado

export const selector = (state = initialState, action) => {
    
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
          console.log(action.payload.data.userData)
          let newUserInfo = {
            ...state.userInfo,
            ...action.payload.data.userData,
            isFetchingUserInfo: action.payload.isFetchingUserInfo,
            isFetchingUserInfoErr: action.payload.isFetchingUserInfoErr,
          }
          return {
            ...state,
            isLoggedIn: action.payload.data.isLoggedIn,
            showSki: action.payload.data.showSki,
            showBici: action.payload.data.showBici,
            hasInitInfo: true,
            userInfo: newUserInfo
          }  
        default:
          return state;
    }
}