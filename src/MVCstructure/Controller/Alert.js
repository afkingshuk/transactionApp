import { v4 } from 'uuid'
import { SET_ERRORS, RESET_ERRORS, SET_SUCCESS_MSG, RESET_SUCCESS_MSG } from '../../utils/Constants'

export const setErrors = (errors, timeout = 5000) => dispatch => {
    const id = v4()
    dispatch({
        type: SET_ERRORS,
        payload: { errors, id }
    })
    setTimeout(() => dispatch({ type: RESET_ERRORS, payload: id }), timeout)
}
export const setSuccessMsg = (successMsg, timeout = 5000) => dispatch => {
    console.log('aaaaaaa', successMsg)
    const id = v4()
    dispatch({
        type: SET_SUCCESS_MSG,
        payload: { successMsg, id }

    })
    setTimeout(() => dispatch({ type: RESET_SUCCESS_MSG, payload: id }), timeout)
}