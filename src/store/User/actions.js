import {
  ADD_USER,
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  GET_ALL_USER,
  GET_ALL_USER_FAIL,
  GET_ALL_USER_SUCCESS,
  GET_USER_ROLE,
  GET_USER_ROLE_SUCCESS,
  GET_USER_ROLE_FAIL,
  GET_SUPERVISOR,
  GET_SUPERVISOR_FAIL,
  GET_SUPERVISOR_SUCCESS,
  GET_USER_DETAILS,
  GET_USER_DETAILS_FAIL,
  GET_USER_DETAILS_SUCCESS,
  STORE_USER_DATA,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  GET_SINGLE_USER,
  GET_SINGLE_USER_SUCCESS,
  GET_SINGLE_USER_FAIL,
  STORE_USER_LOADING
} from "./actionTypes";

export const addUser = (data, history, authtoken, id) => ({
  type: ADD_USER,
  payload: { data, history, authtoken, id },
});

export const addUserSuccess = (data) => ({
  type: ADD_USER_SUCCESS,
  payload: data,
});

export const addUserFail = (error) => ({
  type: ADD_USER_FAIL,
  payload: error,
});
export const getUsers = (authtoken, Centralrole, value, currentPage, pageRange) => ({
  type: GET_ALL_USER,
  payload: { authtoken, Centralrole, value, currentPage, pageRange },
});

export const getUsersSuccess = (data, authtoken) => ({
  type: GET_ALL_USER_SUCCESS,
  payload: { data, authtoken },
});

export const getUsersFail = (error) => ({
  type: GET_ALL_USER_FAIL,
  payload: error,
});
export const getUserRole = (authtoken) => ({
  type: GET_USER_ROLE,
  payload: { authtoken},
});

export const getUserRoleSuccess = (data, authtoken) => ({
  type: GET_USER_ROLE_SUCCESS,
  payload: { data, authtoken },
});

export const getUserRoleFail = (error) => ({
  type: GET_USER_ROLE_FAIL,
  payload: error,
});
export const getSuperVisor = (authtoken, role, list, currentPage) => ({
  type: GET_SUPERVISOR,
  payload: { authtoken, role, list, currentPage },
});

export const getSuperVisorSuccess = (data, authtoken) => ({
  type: GET_SUPERVISOR_SUCCESS,
  payload: { data, authtoken },
});

export const getSuperVisorFail = (error) => ({
  type: GET_SUPERVISOR_FAIL,
  payload: error,
});

export const getUserDetails = (authtoken, id) => ({
  type: GET_USER_DETAILS,
  payload: { authtoken, id },
});

export const getUserDetailsSuccess = (data) => ({
  type: GET_USER_DETAILS_SUCCESS,
  payload: { data },
});
export const getUserDetailsFail = (error) => ({
  type: GET_USER_DETAILS_FAIL,
  payload: error,
});

//EDIT USER
export const storeUserData = (name, data) => ({
  type: STORE_USER_DATA,
  payload: { name, data },
});

export const updateUser = (id, data, token, history) => ({
  type: UPDATE_USER,
  payload: { id, data, token, history },
});

export const updateUserSuccess = (id, data) => ({
  type: UPDATE_USER_SUCCESS,
  payload: { id, data },
});

export const updateUserFail = (error) => ({
  type: UPDATE_USER_FAIL,
  payload: error,
});

export const getSingleUser = (authtoken, id) => ({
  type: GET_SINGLE_USER,
  payload: { authtoken, id },
});

export const getSingleUserSuccess = (data, authtoken) => ({
  type: GET_SINGLE_USER_SUCCESS,
  payload: { data, authtoken },
});

export const getSingleUserFail = (error) => ({
  type: GET_SINGLE_USER_FAIL,
  payload: error,
});

export const storeUserLoading = (name, data) => ({
  type: STORE_USER_LOADING,
  payload: { name, data },
})
