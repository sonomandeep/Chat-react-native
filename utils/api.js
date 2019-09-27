import axios from 'axios';
import {
  LOGIN_LINK,
  USERS_LIST_LINK,
  FCM_SEND_NOTIFICATION,
  SET_FCM_TOKEN,
  SIGNUP_LINK,
  getProfileUpdateLink,
  getProfileImageUpdateLink,
} from '../constants/apiLinks';

export const login = async (username, password) => {
  const res = await axios.post(LOGIN_LINK, { username, password });
  return res;
};

export const signup = async (name, email, username, password) => {
  const res = await axios.post(SIGNUP_LINK, { email, name, username, password });
  return res.data;
};

export const getUsers = async _id => {
  const res = await axios.post(USERS_LIST_LINK, { userID: _id });
  return res.data;
};

export const setFcmTokenApi = async (_id, fcmToken) => {
  await axios.post(SET_FCM_TOKEN, { _id, fcmToken });
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

export const updateProfile = async (username, data) => {
  try {
    const res = await axios.patch(getProfileUpdateLink(username), data);
    console.log('Immagine cambiata:', res);
    return res;
  } catch (error) {
    console.log('Errore durante update profilo:', error);
    return error;
  }
};

export const updateProfileImage = async (username, image) => {
  const formData = new FormData();
  formData.append('image', { uri: image.uri, type: 'image/jpeg', name: 'image.jpg' });

  try {
    const res = await axios.patch(getProfileImageUpdateLink(username), formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  } catch (error) {
    console.log('Errore durante il caricamento della foto:', error);
    return error;
  }
};
