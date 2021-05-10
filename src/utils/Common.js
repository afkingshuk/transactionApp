import jwt_decode from 'jwt-decode';
import axios from 'axios';
import store from '../store/store';
import { signIn } from '../MVCstructure/Controller/Auth';
import { getProfile } from '../MVCstructure/Controller/profileActions';

export const validateFields = (fieldsToValidate) => {
  return fieldsToValidate.every((f) => Object.values(f)[0] !== '')
}
export const maintainSession = () => {
  const user_token = localStorage.getItem('user_token');
  if (user_token) {
    const decoded = jwt_decode(user_token);
    updateStore(decoded);
  }
};
export const updateStore = (user) => {
  const { userid, email } = user;
  store.dispatch(
    signIn({
      userid,
      email,
      token: localStorage.getItem('user_token')
    })
  );
  store.dispatch(getProfile(email));
};
export const setAuthHeader = () => {
  const token = localStorage.getItem('user_token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const removeAuthHeader = () => {
  delete axios.defaults.headers.common['Authorization'];
};