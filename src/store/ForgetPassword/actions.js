import
    {
        FORGET_PASSWORD,
        FORGET_PASSWORD_FAIL,
        FORGET_PASSWORD_SUCCESS
    } from './actionTypes';

export const forgetPassword = ( email) =>
{
    return {
        type: FORGET_PASSWORD,
        payload : { email}
    }
}

export const forgetPasswordSuccess = (message) =>
{
    return {
        type: FORGET_PASSWORD_SUCCESS,
        payload: {message}
    }
}

export const forgetPasswordFail = message =>
{
    return {
        type: FORGET_PASSWORD_FAIL,
        payload: {message}
    }
}