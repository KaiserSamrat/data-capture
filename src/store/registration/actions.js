import {
   
    REGISTRATION_USER,
    REGISTRATION_USER_FAIL,
  REGISTRATION_USER_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS
} from "./actionTypes"
  

//registration user
export const registrationUser = (
    role,
    firstName,
    lastName,
    email,
    phoneNumber,
    
    instituteName,
    password,
    confirmPassword) =>
  ({
    type: REGISTRATION_USER,
    payload: {
        role,
        firstName,
        lastName,
        email,
        phoneNumber,
     
        instituteName,
        password,
        confirmPassword}
    })
  
  
    //registration success
  export const registrationSuccess = message => ({
    type: REGISTRATION_USER_SUCCESS,
    payload: {message}
  })
    
  //registration Fail
  export const registrationFail = message => ({
    type: REGISTRATION_USER_FAIL,
    payload: {message}
})
  
export const resetPassword = ( email, accountActivateToken, password, confirmPassword, history) => ({
  type: RESET_PASSWORD,
  payload: { email, accountActivateToken, password, confirmPassword, history}
})

export const resetPasswordSuccess = message => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: {message}
})


export const resetPasswordFail = message => ({
  type: RESET_PASSWORD_FAIL,
  payload: {message}
})