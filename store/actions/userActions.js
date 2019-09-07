import { login } from '../../utils/api';

export const loginAction = (username, password) => async dispatch => {
  const res = await login(username.trim(), password.trim());
  return res.data;
};

// TODO: Singup
export const signupAction = (username, password) => dispatch => {
  login(username, password)
    .then(dispatch({ type: 'SIGNUP' }))
    .catch(error => console.log(error));
};
