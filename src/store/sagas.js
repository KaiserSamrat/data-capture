import { all, fork } from 'redux-saga/effects';

import DashboardSaga from './Dashboard/saga';

import forgetPasswordSaga from './ForgetPassword/saga';
import GEOSaga from './GEO/saga';
import LayoutSaga from './layout/saga';
import LoginSaga from './login/saga';
import ProductSaga from './Product/saga';
import InfoSaga from './Info/saga';
import { default as registrationSaga } from './registration/saga';

import UserSaga from './User/saga';

export default function* rootSaga() {
  yield all([fork(LoginSaga)]);
  yield all([fork(registrationSaga)]);
  yield all([fork(forgetPasswordSaga)]);
  yield all([fork(UserSaga)]);
  yield all([fork(GEOSaga)]);
  yield all([fork(ProductSaga)]);
  yield all([fork(InfoSaga)]);
  yield all([fork(DashboardSaga)]);
  yield all([fork(LayoutSaga)]);
}
