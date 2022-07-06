import
    {
        FORGET_PASSWORD,
        FORGET_PASSWORD_FAIL,
        FORGET_PASSWORD_SUCCESS
} from './actionTypes';
    
const initialState = {
    loading: false,
    message: "",
    eror : ""
}



const fogetPassword = (state = initialState, action) =>
{
    switch (action.type) {
        case FORGET_PASSWORD:
            state = {
                ...state,
                loading: true
            }
            break
        case FORGET_PASSWORD_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break
        case FORGET_PASSWORD_FAIL:
            state = {
                ...state,
                loading: false,
                error : action.payload.message
            }
        break
        default:
            state = state
            break
        }
        return state

}

export default fogetPassword