import {
  LOGIN_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  UPDATE_USER_INFO,
  UPDATE_USER_INFO_FAIL,
  UPDATE_USER_INFO_SUCCESS,
} from "./actionTypes";

/*
object take user (email and pass) and history
*/
export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history },
  };
};

/*
user : user name
token : jwt token to verify user
email  : user email
userrole : take user role to push user into his own dashboard ex : if userrole "admin" will help to push into admindashboard
*/
export const loginSuccess = (token, email, userrole, warehouse) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { token, email, userrole, warehouse },
  };
};
/*
to logout user only need history , will push user 
*/
export const logoutUser = (history) => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  };
};

//logout user
export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  };
};

//will do work leter
export const loginUserError = () => ({
  type: LOGIN_USER_ERROR,
});

export const updateUserInfo = (firstName, lastName, phoneNo) => ({
  type: UPDATE_USER_INFO,
  payload: { firstName, lastName, phoneNo },
});
export const updateUserInfoSuccess = (message) => ({
  type: UPDATE_USER_INFO_SUCCESS,
  payload: { message },
});

export const updateUserInfoFail = (error) => ({
  type: UPDATE_USER_INFO_FAIL,
  payload: { error },
});
