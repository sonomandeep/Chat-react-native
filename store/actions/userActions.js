import { login } from '../../utils/api';

export const loginAction = (username, password) => async dispatch => {
  const res = await login(username.trim(), password.trim());
  dispatch({ type: 'LOGIN', user: res.data.user });
  return res.data;
};

export const logoutAction = () => dispatch => dispatch({ type: 'LOGOUT' });

export const signupAction = (username, password) => dispatch => {
  login(username, password)
    .then(dispatch({ type: 'SIGNUP' }))
    .catch(error => console.log(error));
};

export const setSocketAction = socket => dispatch => {
  dispatch({ type: 'SET_SOCKET', payload: socket });
};
