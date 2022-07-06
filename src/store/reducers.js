import { combineReducers } from 'redux';

import DashboardReducer from './Dashboard/reducer';

import ForgetPassword from './ForgetPassword/reducer';

import Layout from './layout/reducer';
import Login from './login/reducer';
import loginError from './loginError/reducer';
import ProductReducer from './Product/reducers';
import GeoReducer from './GEO/reducers';
import registration from './registration/reducer';
import InfoReducer from './Info/reducers';
import UserReducer from './User/reducers';

const rootReducer = combineReducers({
  Login,
  registration,
  UserReducer,
  loginError,
  ForgetPassword, 
  ProductReducer,
  InfoReducer,
  DashboardReducer,
  GeoReducer,
  Layout,
});

export default rootReducer;
