export const LOCALHOST_IP = '192.168.178.109';
export const API_LINK = `http://${LOCALHOST_IP}:5000`;
export const LOGIN_LINK = `${API_LINK}/login`;
export const SIGNUP_LINK = `${API_LINK}/signup`;
export const USERS_LIST_LINK = `${API_LINK}/users`;
export const SET_FCM_TOKEN = `${API_LINK}/push_token`;
export const FCM_SEND_NOTIFICATION = 'https://fcm.googleapis.com/fcm/send';

export const getProfileUpdateLink = username => `${API_LINK}/${username}/update`;
export const getProfileImageUpdateLink = username => `${API_LINK}/${username}/update_profile_image`;
