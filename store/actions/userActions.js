import {
  login,
  setFcmTokenApi,
  signup,
  updateProfile,
  updateProfileImage,
  resetPassword,
  verifyResetPassword,
} from '../../utils/api';

export const setUserAction = data => async dispatch => {
  dispatch({ type: 'SET_USER', payload: data });
};

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

export const updateProfileAction = data => async (dispatch, getState) => {
  const state = getState();
  const { username } = state.user.user;

  try {
    const res = await updateProfile(username, data);
    dispatch({ type: 'SET_USER', payload: { ...res.data } });
  } catch (error) {
    console.log('Errore durante updateProfileAction:', error);
  }
};

export const updateProfileImageAction = data => (dispatch, getState) => {
  const state = getState();
  const { username } = state.user.user;

  updateProfileImage(username, data).then(res => {
    dispatch({ type: 'SET_USER', payload: res.data });
  });
};

export const resetPasswordAction = email => async dispatch => {
  try {
    const res = await resetPassword(email);
    return res;
  } catch (error) {
    console.log('ResetPasswordAction:', error);
    return error;
  }
};

export const verifyResetPasswordAction = data => async dispatch => {
  try {
    const res = await verifyResetPassword(data);
    console.log(res.data.user);
    dispatch({ type: 'SET_USER', payload: { ...res.data.user } });
    dispatch({ type: 'SET_FCM_TOKEN', payload: res.data.fcmToken });
    return res;
  } catch (error) {
    console.log('VerifyResetPasswordAction:', error);
    return error;
  }
};
