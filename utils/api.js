import axios from 'axios';
import { LOGIN_LINK } from '../constants/apiLinks';

export const login = (username, password) => {
  return axios.post(LOGIN_LINK, { username, password });
};

export const signup = () => {};
