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

const initialState = {
  loading: false,
  username: "",
  token: "",
  email: "",
  userrole: "",
  warehouse: "",
  message: "",
  error: "",
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        username: action.payload.user,
        token: action.payload.token,
        email: action.payload.email,
        userrole: action.payload.userrole,
        warehouse:action.payload.warehouse,
        loading: false,
      };
      break;
    case LOGIN_USER_ERROR:
      state = {
        ...state,

        loading: false,
      };
      break;
    case LOGOUT_USER:
      state = { ...state, username: "", token: "", email: "", userrole: "", warehouse: "" };
      break;
    case LOGOUT_USER_SUCCESS:
      state = { ...state };
      break;
    case UPDATE_USER_INFO:
      state = { ...state, loading: true };
      break;
    case UPDATE_USER_INFO_SUCCESS:
      state = { ...state, loading: false, message: action.payload.message };
      break;
    case UPDATE_USER_INFO_FAIL:
      state = { ...state, loading: false, error: action.payload.message };
      break;
    default:
      state = state;
      break;
  }
  return state;
};

export default login;
