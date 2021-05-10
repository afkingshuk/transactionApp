import { setErrors } from './Alert'
// import {history} from '../routers/AppRouter'
import { UPDATE_PROFILE, GET_PROFILE } from '../../utils/Constants';
import axios from 'axios'
import { setAuthHeader, removeAuthHeader } from '../../utils/Common'

export const updateProfile = (profile) => async dispatch => {
    try {
        const res = await axios.post('/profile', profile)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        // history.push('/profile');
    } catch (error) {
        error.response &&
            dispatch(setErrors(error.response.data));
    }
}

export const getProfile = () => async dispatch => {
    try {
        setAuthHeader()
        const res = await axios.get('/profile')
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        error.response && dispatch(setErrors(error.response.data));
    }
}