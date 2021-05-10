import { SIGN_IN, SIGN_OUT } from '../../utils/Constants'
import axios from 'axios'
import { setErrors, setSuccessMsg } from './Alert'
import { setAuthHeader, removeAuthHeader } from '../../utils/Common'
// import {history} from '../routers/AppRouter'
import { Redirect } from 'react-router-dom'
import Profile from '../View/Profile'
import { getProfile } from './profileActions'


export const initiateLogin = (email, password) => async dispatch => {
    try {
        const result = await axios.post('/signin', {
            email,
            password
        })
        const user = result.data
        localStorage.setItem('user_token', user.token);
        dispatch({
            type: SIGN_IN,
            payload: user
        })
        dispatch(getProfile(user.email))
        // history.push('/profile')
    }
    catch (error) {
        console.log(error.response.data)
        dispatch(setErrors(error.response.data))
    }
}

export const register = (data) => async dispatch => {
    try {
        const res = await axios.post('/signup', data)
        dispatch(setSuccessMsg('User Registered Successfully!!'))
        return { success: true }
    }
    catch (error) {
        console.log(error)
        dispatch(setErrors(error.response.data))
        return { success: false }
    }
}
export const signIn = (user) => dispatch => {
    dispatch({
        type: SIGN_IN,
        payload: user
    })
}
export const signOut = () => ({
    type: SIGN_OUT
});

export const logout = () => async dispatch => {
    try {
        setAuthHeader();
        await axios.post(`/logout`);
        removeAuthHeader();
        localStorage.removeItem('user_token');
        return dispatch(signOut());
    } catch (error) {
        error.response && dispatch(setErrors(error.response.data));
    }
};