import { login, setFcmTokenApi, signup } from '../../utils/api';

export const loginAction = (username, password) => async dispatch => {
  const res = await login(username.trim(), password.trim());
  dispatch({ type: 'LOGIN', payload: res.data.user });
  return res.data;
};

export const signupAction = (name, email, username, password) => async dispatch => {
  try {
    const data = await signup(name.trim(), email.trim(), username.trim(), password.trim());
    dispatch({ type: 'SIGNUP', payload: data.user });
    return data;
  } catch (error) {
    console.log('Errore durante signupAction:', error);
    return null;
  }
};

export const logoutAction = () => dispatch => dispatch({ type: 'LOGOUT' });

export const setFcmTokenAction = (_id, fcmToken) => dispatch => {
  dispatch({ type: 'SET_FCM_TOKEN', payload: fcmToken });
  setFcmTokenApi(_id, fcmToken);
};
