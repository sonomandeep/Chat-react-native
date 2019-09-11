import axios from 'axios';
import { LOGIN_LINK, USERS_LIST_LINK } from '../constants/apiLinks';

export const login = async (username, password) => {
  const res = await axios.post(LOGIN_LINK, { username, password });
  return res;
};

export const signup = () => {};

export const getUsers = async _id => {
  const res = await axios.post(USERS_LIST_LINK, { userID: _id });
  return res.data;
};
