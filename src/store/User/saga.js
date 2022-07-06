import { toast } from "react-toastify";
import { call, delay, put, takeEvery } from "redux-saga/effects";
import { toaster } from "../../helpers/custom/toaster"
import { getData, postData,updateData } from "../../helpers/api_helper"
import {
  addUserData,
  getUserData,
  getUserDetailsData,
  updateUserData,
} from '../../helpers/api_helper.js';
import {
  addUserFail,
  addUserSuccess,
  getSuperVisorFail,
  getSuperVisorSuccess,
  getUserDetailsFail,
  getUserDetailsSuccess,
  getUserRoleFail,
  getUserRoleSuccess,
  getUsersFail,
  getUsersSuccess,
  updateUserFail,
  getSingleUserSuccess,
  getSingleUserFail,
  storeUserLoading
} from "./actions";
import {
  ADD_USER,
  GET_ALL_USER,
  GET_SUPERVISOR,
  GET_USER_DETAILS,
  GET_USER_ROLE,
  UPDATE_USER,
  GET_SINGLE_USER
} from "./actionTypes";

function* onAddNewUser({ payload: { data, history, authtoken, id } }) {
  try {
    let response
    if (id) {
      console.log('jjjj');
      const url = `/users/${id}`
      response = yield call(updateData, url, data, authtoken)
      yield put(storeUserLoading('addingUser', false));
     
      toaster("success", "User Update successfully!")
    } else {
      const url = "/users"
      response = yield call(postData, url, data, authtoken)
      yield put(storeUserLoading('addingUser', false));
      toaster("success", "Users added successfully!")
    }
    console.log(response);
    yield put(addUserSuccess(response));
  history.push("/user")
  } catch (error) {
    if (!error.response) {
        history.push("/user")
    } else {
      let message = error.response.data.message;
      yield put(addUserFail(message));
      toast.error(message);
    }
  }
}

function* fetchUser({
  payload: { authtoken, Centralrole, value, currentPage, pageRange },
}) {
  try {
    const url = `/users/get-users?currentpage=${currentPage}&useremployee=${
      value || ''
    }&role=${Centralrole || ''}&limitValue=${pageRange}`;
    const response = yield call(getData, url, authtoken);

    yield put(getUsersSuccess(response));
  } catch (error) {
    yield put(getUsersFail(error));
  }
}
function* fetchSingleUser({ payload: { authtoken, id } }) {
  try {
console.log('authtoken', authtoken);
    const url = `/users/${id}`
    const response = yield call(getData, url, authtoken)

    yield put(getSingleUserSuccess(response))
  } catch (error) {
    yield put(getSingleUserFail(error))
  }
}

function* fetchRoleUser({ payload: { authtoken } }) {
  try {
    // console.log(role)
    // const newQuery = `?${query}`
    const url = `/users/get-role-users?role=USER`;
    const response = yield call(getData, url, authtoken);

    yield put(getUserRoleSuccess(response));
    console.log('response', response);
  } catch (error) {
    yield put(getUserRoleFail(error));
  }
}
function* fetchSuperVisor({ payload: { authtoken, role, list, currentPage } }) {
  try {
    delay(500);
    const response = yield call(
      getUserData,
      authtoken,
      role,
      list,
      currentPage
    );
    yield put(getSuperVisorSuccess(response));
    // console.log('line 15', response.data.users);
  } catch (error) {
    yield put(getSuperVisorFail(error));
    console.log('hi');
  }
}
function* fetchUserDetails({ payload: { authtoken, id } }) {
  try {
    const response = yield call(getUserDetailsData, authtoken, id);
    yield put(getUserDetailsSuccess(response));
    // console.log('line 15', response.data.users);
  } catch (error) {
    yield put(getUserDetailsFail(error));
    console.log('hi');
  }
}
//EDIT USER
function* onUpdateUser({ payload: { id, data, token, history } }) {
  try {
    const response = yield call(updateUserData, id, data, token);

    toast('🦄 User updated successfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    //yield put(getUserValue(token, 1, 10));
    if (response.status === 200) {
      history.push('/user-list');
    }
  } catch (error) {
    console.log(error.response);
    yield put(updateUserFail(error));
  }
}

function* UserSaga() {
  yield takeEvery(ADD_USER, onAddNewUser);
  yield takeEvery(GET_ALL_USER, fetchUser);
  yield takeEvery(GET_SUPERVISOR, fetchSuperVisor);
  yield takeEvery(GET_USER_DETAILS, fetchUserDetails);
  yield takeEvery(UPDATE_USER, onUpdateUser);
  yield takeEvery(GET_USER_ROLE, fetchRoleUser);
  yield takeEvery(GET_SINGLE_USER, fetchSingleUser);
}

export default UserSaga;
