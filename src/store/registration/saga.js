import { toast } from 'react-toastify';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  axiosResetPassword,
  axiosStudentRegistration,
  axiosTeacherRegistration,
} from '../../helpers/api_helper';
import { loginSuccess } from '../login/actions';
import {
  registrationFail,
  registrationSuccess,
  resetPasswordFail,
  resetPasswordSuccess,
} from './actions';
import { REGISTRATION_USER, RESET_PASSWORD } from './actionTypes';

//registration user
const asyncRegistrationUser = async (
  role,
  firstName,
  lastName,
  email,
  phoneNumber,

  instituteName,
  password,
  confirmPassword
) => {
  try {
    let response;
    if (role === 'teacher') {
      response = await axiosTeacherRegistration(
        role,
        firstName,
        lastName,
        email,
        phoneNumber,

        instituteName,
        password,
        confirmPassword
      );
    } else if (role === 'student') {
      response = await axiosStudentRegistration(
        role,
        firstName,
        lastName,
        email,
        phoneNumber,

        instituteName,
        password,
        confirmPassword
      );
    }

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
function* workerRegistrationUser({
  payload: {
    role,
    firstName,
    lastName,
    email,
    phoneNumber,

    instituteName,
    password,
    confirmPassword,
  },
}) {
  try {
    // yield put(registrationFail())
    //console.log("user registration data call", role)
    const response = yield call(
      asyncRegistrationUser,
      role,
      firstName,
      lastName,
      email,
      phoneNumber,

      instituteName,
      password,
      confirmPassword
    );
    //console.log("resposne data", response)
    if (response.status == 'success') {
      yield put(registrationFail());
      yield put(registrationSuccess(response.message));
      toast.success(response.message);
      yield put(registrationSuccess());
    } else {
      yield put(registrationFail(response.message));
    }
  } catch (error) {}
}

//reset password
const asyncResetPassword = async (
  email,
  accountActivateToken,
  password,
  confirmPassword
) => {
  try {
    const response = await axiosResetPassword(
      accountActivateToken,
      email,
      password,
      confirmPassword
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
function* workerResetPassword({
  payload: { email, accountActivateToken, password, confirmPassword, history },
}) {
  try {
    const response = yield call(
      asyncResetPassword,
      email,
      accountActivateToken,
      password,
      confirmPassword
    );

    console.log('response here result', response);
    if (response.status === 'success') {
      //   // yield put(loginSuccess(loginUserResponse.user.fullname, loginUserResponse.token, loginUserResponse.user.email, loginUserResponse.user.role))
      yield put(resetPasswordSuccess('Password Reset Successfully'));

      yield put(
        loginSuccess(
          response.user.firstName
            ? response.user.firstName
            : response.user.email.split('@')[0],
          response.token,
          response.user.email,
          response.user.role
        )
      );
      //console.log("history data here", history.location.state)

      if (localStorage.getItem('linkUrl') == 'cart-page') {
        localStorage.removeItem('linkUrl');
        history.push('/cart-page');
      } else {
        history.push(`/home`);
      }

      yield put(resetPasswordSuccess(''));
    } else {
      //console.log("hello error", response)
      yield put(resetPasswordFail(response.message));
    }
  } catch (error) {}
}

function* registrationSaga() {
  yield takeEvery(REGISTRATION_USER, workerRegistrationUser);
  yield takeEvery(RESET_PASSWORD, workerResetPassword);
}

export default registrationSaga;
