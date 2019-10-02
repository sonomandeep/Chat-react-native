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
  return new Promise((resolve, reject) =>
    login(username.trim(), password.trim())
      .then(({ payload }) => {
        dispatch({ type: 'LOGIN', payload: { ...payload.user } });
        resolve(payload);
      })
      .catch(({ error }) => {
        reject(error);
      })
  );
};

export const signupAction = (name, email, username, password) => async dispatch => {
  return new Promise((resolve, reject) =>
    signup(name.trim(), email.trim(), username.trim(), password.trim())
      .then(({ payload }) => {
        dispatch({ type: 'SIGNUP', payload: { ...payload.user } });
        resolve(payload);
      })
      .catch(error => reject(error))
  );
};

export const logoutAction = () => dispatch => dispatch({ type: 'LOGOUT' });

export const setFcmTokenAction = (_id, fcmToken) => dispatch => {
  dispatch({ type: 'SET_FCM_TOKEN', payload: fcmToken });
  setFcmTokenApi(_id, fcmToken);
};

export const updateProfileAction = data => async (dispatch, getState) => {
  const state = getState();
  const { username, token } = state.user.user;

  return new Promise((resolve, reject) =>
    updateProfile(username, data, token)
      .then(res => {
        dispatch({ type: 'SET_USER', payload: { ...res.data.payload } });
        resolve();
      })
      .catch(error => {
        console.log('Errore durante updateProfileAction:', error);
        reject(error);
      })
  );
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
