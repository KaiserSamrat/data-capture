import {
    USER_ERROR,

} from "./actionTypes"

const initialState = {
    error: "",

}

const loginError = (state = initialState, action) => {
    switch (action.type) {

        case USER_ERROR:
            state = {
                ...state,
                error: action.payload.message,

            }
            break


        default:
            state = state
            break
    }
    return state
}

export default loginError