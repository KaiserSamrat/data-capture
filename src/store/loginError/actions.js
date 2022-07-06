import {

    USER_ERROR
} from "./actionTypes"
//will do work leter
export const UserError = (message) => ({
    type: USER_ERROR,
    payload: { message },
});