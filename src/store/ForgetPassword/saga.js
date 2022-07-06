import { call, put, takeEvery } from "redux-saga/effects"
import { axiosForgetPassword } from "../../helpers/api_helper"

import {  forgetPasswordSuccess, forgetPasswordFail } from "./actions"
import {   FORGET_PASSWORD } from "./actionTypes"
import { toast } from 'react-toastify';


//forget password
const asyncForgetPassword = async (email) =>
{
    try {
        const response = await axiosForgetPassword(email)
        return response.data
    } catch (error) {
        return error.response.data
    }
}
function* workerForgetPassword({ payload: { email } })
{
    try {
        const response = yield call(asyncForgetPassword, email)
        if (response.status == "success") {
            yield put(forgetPasswordSuccess())
            yield put(forgetPasswordFail())
            toast.success(response.message)
            // window.location.reload("/successfull-recover-account")

            yield put(forgetPasswordSuccess(response.message))
        } else {
            yield put(forgetPasswordFail())
            yield put(forgetPasswordFail(response.message))
        }
    } catch (error) {
        
    }
}

function* forgetPasswordSaga()
{
    yield takeEvery(FORGET_PASSWORD, workerForgetPassword)
}

export default forgetPasswordSaga