import { GET_ACCOUNT, UPDATE_ACCOUNT } from '../../utils/Constants'
import { setErrors } from './Alert'
import axios from 'axios'
import { setAuthHeader } from '../../utils/Common'

export const getAccountDetails = () => async dispatch => {
    try {
        setAuthHeader()
        const account = await axios.get('/account')
        dispatch({
            type: GET_ACCOUNT,
            payload: account.data
        })
    } catch (error) {
        error.response && dispatch(setErrors(error.response.data));
    }
}

export const updateAccount = (accountInfo) => async dispatch => {
    dispatch({
        type: UPDATE_ACCOUNT,
        payload: accountInfo
    })
};

export const addAccountDetails = (account_no, bank_name, ifsc) => async dispatch => {
    try {
        setAuthHeader()
        const account = await axios.post('/account', {
            account_no,
            bank_name,
            ifsc
        })
        dispatch({
            type: GET_ACCOUNT,
            payload: account.data
        })
    } catch (error) {
        error.response && dispatch(setErrors(error.response.data));
    }
}
export const updateAccountDetails = (ifsc) => async dispatch => {
    try {
        setAuthHeader()
        const account = await axios.patch('/account', {
            ifsc
        })
        dispatch({
            type: GET_ACCOUNT,
            payload: account.data
        })
    } catch (error) {
        error.response && dispatch(setErrors(error.response.data));
    }
}