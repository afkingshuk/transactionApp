import { SET_ERRORS, RESET_ERRORS, SET_SUCCESS_MSG, RESET_SUCCESS_MSG, } from '../../utils/Constants'


const initialState = {
    error: [],
    success: []
}

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                error: [...state.error, action.payload]
            }
        case RESET_ERRORS:
            return {
                ...state,
                error: state.error.filter(error => error.id !== action.payload)
            }
        case SET_SUCCESS_MSG:
            return {
                ...state,
                success: [...state.success, action.payload]
            }
        case RESET_SUCCESS_MSG:
            return {
                ...state,
                success: state.success.filter(succ => succ.id !== action.payload)
            }
        default:
            return state;
    }
}

export default alertReducer