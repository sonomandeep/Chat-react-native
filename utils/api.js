import axios from 'axios';
import { LOGIN_LINK } from '../constants/apiLinks';

export const login = async (username, password) => {
  const res = await axios.post(LOGIN_LINK, { username, password });
  return res;
};

export const signup = () => {};
