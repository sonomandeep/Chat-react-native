import axios from 'axios';
import {
  LOGIN_LINK,
  USERS_LIST_LINK,
  FCM_SEND_NOTIFICATION,
  SET_FCM_TOKEN,
} from '../constants/apiLinks';

export const login = async (username, password) => {
  const res = await axios.post(LOGIN_LINK, { username, password });
  return res;
};

export const signup = () => {};

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

  // {
  //   to: 'YOUR_FCM_TOKEN_WILL_BE_HERE',
  //   collapse_key: 'type_a',
  //   notification: {
  //     body: 'Body of Your Notification',
  //     title: 'Title of Your Notification',
  //   },
  //   data: {
  //     body: 'Body of Your Notification in Data',
  //     title: 'Title of Your Notification in Title',
  //     key_1: 'Value for key_1',
  //     key_2: 'Value for key_2',
  //   },
  // };

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

  axios.post(FCM_SEND_NOTIFICATION, payload, config);
};
