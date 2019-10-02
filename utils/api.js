import axios from 'axios';
import {
  LOGIN_LINK,
  USERS_LIST_LINK,
  FCM_SEND_NOTIFICATION,
  SET_FCM_TOKEN,
  SIGNUP_LINK,
  RESET_PASSWORD,
  VERIFY_RESET_PASSWORD,
  getProfileUpdateLink,
  getProfileImageUpdateLink,
} from '../constants/apiLinks';

export const login = async (username, password) => {
  return new Promise((resolve, reject) =>
    axios
      .post(LOGIN_LINK, { username, password })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => reject(error.response.data))
  );
};

export const signup = async (name, email, username, password) => {
  return new Promise((resolve, reject) =>
    axios
      .post(SIGNUP_LINK, { email, name, username, password })
      .then(res => resolve(res.data))
      .catch(error => reject(error.response.data))
  );
};

export const getUsers = (token, _id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(USERS_LIST_LINK, { userID: _id }, { headers: { Authorization: token } })
      .then(res => resolve(res.data))
      .catch(error => reject(error.response.data));
  });
};

export const setFcmTokenApi = async (_id, fcmToken) => {
  await axios.post(SET_FCM_TOKEN, { _id, fcmToken });
  // return new Promise((resolve, reject) => axios.post(SET_FCM_TOKEN, { _id, fcmToken }));
};

export const sendNotification = async data => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'key=AIzaSyCM3QBFl18h5vCxf0Sc0tKTCnYyCodwK0o',
    },
  };

  const payload = {
    to: data.fcmToken,
    content_available: true,
    notification: {
      body: data.body,
      title: data.title,
      content_available: true,
      priority: 'HIGH',
      sound: 'default',
    },
    data: {
      body: data.body,
      title: data.title,
      key_1: 'Value for key_1',
      key_2: 'Value for key_2',
      android_channel_id: 'message-channel',
      sound: 'default',
    },
    priority: 'high',
  };

  axios
    .post(FCM_SEND_NOTIFICATION, payload, config)
    .then('Notifica inviata:', payload)
    .catch(error => console.log("Errore durante l'invio della notifica:", error));
};

export const updateProfile = async (username, data, token) => {
  return new Promise((resolve, reject) =>
    axios
      .patch(getProfileUpdateLink(username), data, { headers: { Authorization: token } })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error.response.data);
      })
  );
};

export const updateProfileImage = async (username, image, token) => {
  const formData = new FormData();
  formData.append('image', { uri: image.uri, type: 'image/jpeg', name: 'image.jpg' });

  return axios.patch(getProfileImageUpdateLink(username), formData, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    },
  });
};

export const resetPassword = async email => {
  try {
    const res = await axios.post(RESET_PASSWORD, { email });
    console.log(res);
    return res;
  } catch (error) {
    console.log('Errore resetPassword:', error);
    return error;
  }
};

export const verifyResetPassword = async data => {
  try {
    const res = await axios.post(VERIFY_RESET_PASSWORD, data);
    console.log('verifyResetPassword:', res);
    return res;
  } catch (error) {
    console.log('Error verifyResetPassword:', error);
    return error;
  }
};
