import {
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  GET_ALL_USER_FAIL,
  GET_ALL_USER_SUCCESS,
  GET_SUPERVISOR_FAIL,
  GET_SUPERVISOR_SUCCESS,
  GET_USER_DETAILS_FAIL,
  GET_USER_DETAILS_SUCCESS,
  STORE_USER_DATA,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  GET_USER_ROLE_SUCCESS,
  GET_USER_ROLE_FAIL,
  GET_SINGLE_USER_SUCCESS,
  GET_SINGLE_USER_FAIL,
  STORE_USER_LOADING,
  ADD_USER
} from "./actionTypes";
const INIT_STATE = {
  users: [],
  singleUser: [],
  superVisor: [],
  userDetails: [],
  allUserRole: [],
  userLoading: true,
  editUserInfo: [],
  getUserLoading: true,
  superVisorLoading: true,
  userDetailsLoading: true,
  allUserRoleLoading: true,
  addingUser: false,
  singleUserLoading: true
};

const UserReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        addingUser: true,
      };
    case ADD_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        userLoading: false,
      };
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        users: action.payload.data,
        getUserLoading: false,
      };
    case GET_ALL_USER_FAIL:
      return {
        ...state,
        getUserLoading: false,
      };
      case GET_SINGLE_USER_SUCCESS:
        return {
          ...state,
          singleUser: action.payload.data,
          singleUserLoading: false,
        };
      case GET_SINGLE_USER_FAIL:
        return {
          ...state,
          singleUserLoading: false,
        };
      case GET_USER_ROLE_SUCCESS:
        return {
          ...state,
          allUserRole: action.payload.data,
          allUserRoleLoading: false,
        };
      case GET_USER_ROLE_FAIL:
        return {
          ...state,
          allUserRoleLoading: false,
        };
    case GET_SUPERVISOR_SUCCESS:
      return {
        ...state,
        superVisor: action.payload,
        superVisorLoading: false,
      };
    case GET_SUPERVISOR_FAIL:
      return {
        ...state,
        superVisorLoading: false,
      };
    case GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: action.payload,
        userDetailsLoading: false,
      };
    case GET_USER_DETAILS_FAIL:
      return {
        ...state,
        userDetailsLoading: false,
      };

    //EDIT USER

    case STORE_USER_DATA:
      return {
        ...state,
        editUserInfo: action.payload,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        userData: state.user.map((user) =>
          user.id.toString() === action.payload.id.toString()
            ? { user, ...action.payload }
            : user
        ),
        loading: false,
      };

    case UPDATE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
      case STORE_USER_LOADING:
        return {
          ...state,
          [action.payload.name]: action.payload.data,
       
        
        }

    default:
      return state;
  }
};

export default UserReducer;
