import { SIGN_IN, SIGN_OUT } from '../../utils/Constants'

const initialState = {
    userData: null,
    isAuthenticated: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                userData: action.payload,
                isAuthenticated: true
            }
        case SIGN_OUT:
            return {
                ...state,
                userData: null,
                isAuthenticated: false
            }
        default:
            return state
    }
}

export default authReducer