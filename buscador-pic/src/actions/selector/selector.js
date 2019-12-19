import * as types from './actionTypes';
import ApiPic from './../../apiPic/apiPic';


// Actions para recuperación de datos de estaciones

export const handleSelection = (target) => {
  return {
      type: types.SELECT_BUSCADOR_BICI_SKI,
      payload:{
        selected: target
      }
  };
}


// Actions para recuperación de datos de estaciones

export const fetchingUserInfo = (bool, error) => {
  return {
      type: types.FETCHING_USER_INFO,
      payload:{
        isFetchingUserInfo: true,
        isFetchingUserInfoErr: error,
        data: {},
      }
  };
}


export const fetchUserInfoErr = (bool) => {
  return {
      type: types.FETCH_USER_INFO_ERROR,
      payload:{
        isFetchingUserInfo: false,
        isFetchingUserInfoErr: bool,
        data: {}    
      }
  };
}


export const fetchUserInfoSuccess = (data) => {
  return {
      type: types.FETCH_USER_INFO_SUCCESS,
      payload:{
        isFetchingUserInfo: false,
        isFetchingUserInfoErr: false,
        data: data
      }
  };
}


export const fetchUserInfo = () => {
        
  return (dispatch) => {
    ( async function(){
      dispatch(fetchingUserInfo(true, false));
      try {
        const userInfo = await ApiPic.getInitInfo();
        const response = await userInfo.json();
        if ( response ) {
          dispatch(fetchUserInfoSuccess(response));
        }else{
          dispatch(fetchUserInfoErr(true))            
        }
      } catch (error) {
        dispatch(fetchUserInfoErr(true));
        throw new Error(error);
      }
    })()
  }
}
