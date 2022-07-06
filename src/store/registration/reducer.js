import {
    
    REGISTRATION_USER,
    REGISTRATION_USER_FAIL,
    REGISTRATION_USER_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD
  } from "./actionTypes"
  
  import { loginSuccess } from "../login/actions"
const initialState = {
    loading: false,
    username: "",
    token: "",
    email: "",
    userrole: "",
    message: "",
    error : ""
}
  

  const registration = (state = initialState, action) => {
    switch (action.type) {
      
      case REGISTRATION_USER:
        state = {
          ...state,
        loading: true,
        }
        break
      case REGISTRATION_USER_SUCCESS:
        state = {
          ...state,
          loading: false,
          message : action.payload.message
        }
        break
      case REGISTRATION_USER_FAIL:
        state = {
          ...state,
          loading: false,
          error : action.payload.message
        }
            break
        case RESET_PASSWORD: 
            state = {
                ...state,
                loading: true
            }
            break
        case RESET_PASSWORD_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break
        case RESET_PASSWORD_FAIL:
            state = {
                ...state,
                loading: false,
                error: action.payload.message
            }
            break
      default:
        state = state
        break
    }
    return state
  }
  
  export default registration
  