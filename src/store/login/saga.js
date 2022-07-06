// Login Redux States
import { toast } from "react-toastify";
import { call, put, takeEvery } from "redux-saga/effects";
import { axiosUpdateProfile, axiosUserLogin } from "../../helpers/api_helper";
import { UserError } from "../loginError/actions";
import { loginSuccess, loginUserError } from "./actions";
import { LOGIN_USER, LOGOUT_USER, UPDATE_USER_INFO } from "./actionTypes";

//3rd call async login
const loginWithEmailPasswordAsync = async (employeeId, password) => {
  try {
    console.log("email", employeeId);
    const response = await axiosUserLogin(employeeId, password);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

function* loginUser({ payload: { user, history } }) {
  const { employeeId, password } = user;

  try {
    const loginUserResponse = yield call(
      loginWithEmailPasswordAsync,
      employeeId,
      password
    );

    if (loginUserResponse.status === "success") {
      yield put(
        loginSuccess(
          //loginUserResponse.data.firstName,
          loginUserResponse?.token,
          loginUserResponse?.user?.email,
          loginUserResponse?.user?.role,
          loginUserResponse?.user?.warehouse
        )
      );

      yield put(UserError());
      console.log("user", loginUserResponse.user.role);
      if (loginUserResponse?.user?.role === "SUPERADMIN") {
        history.push(`/admin-dashboard`);
      } else if (loginUserResponse?.user?.role === "CENTRALWAREHOUSE") {
        history.push(`/admin-dashboard`);
      } 
      else if (loginUserResponse?.user?.role === "ADMIN") {
        history.push(`/admin-dashboard`);
      }
      else if (loginUserResponse?.user?.role === "HUB") {
        history.push(`/user`);
      } 
      else if (loginUserResponse?.user?.role === "VIEWADMIN") {
        history.push(`/admin-dashboard`);
      }
      else {
        // console.log("history data here", history.location.state)
        let intended = history.location.state;
        if (intended) {
          history.push(intended.from);
        } else {
          history.push("/");
        }
      }
    } else {
      yield put(UserError());
      yield put(loginUserError());
      // toast.error(loginUserResponse.message)
      yield put(UserError(loginUserResponse.message));
    }
  } catch (error) {
    // console.log("error data", error.response)
    toast.error(error.response);
    yield put(UserError(error));
    yield put(loginUserError());
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    yield put(loginSuccess());
    localStorage.removeItem("persist:primary");

    history.push("/login");
  } catch (error) {
    // yield put(apiError(error))
  }
}

//update user info
const asyncUpdateProfile = async (token, firstName, lastName, phoneNumber) => {
  try {
    const response = await axiosUpdateProfile(
      token,
      firstName,
      lastName,
      phoneNumber
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
function* workerUpdateUserInfo({
  payload: { firstName, lastName, phoneNo, history },
}) {}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
  yield takeEvery(UPDATE_USER_INFO, workerUpdateUserInfo);
}

export default authSaga;
