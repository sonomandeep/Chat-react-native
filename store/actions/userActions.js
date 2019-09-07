import { login } from '../../utils/api';

export const loginAction = (username, password) => dispatch => {
  login(username, password)
    .then(data => dispatch({ type: 'LOGIN', data }))
    .catch(error => console.log(error));
};

// TODO: Singup
export const signupAction = (username, password) => dispatch => {
  login(username, password)
    .then(dispatch({ type: 'SIGNUP' }))
    .catch(error => console.log(error));
};
