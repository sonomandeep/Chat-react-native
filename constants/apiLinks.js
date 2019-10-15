export const LOCALHOST_IP = '192.168.178.109';
// export const API_LINK = `http://${LOCALHOST_IP}:5000`;
export const API_LINK = `https://chat-backend-mern-test.herokuapp.com`;
export const LOGIN_LINK = `${API_LINK}/login`;
// export const SIGNUP_LINK = `${API_LINK}/signup`;
export const SIGNUP_LINK = `${API_LINK}/signup/v2`;
export const USERS_LIST_LINK = `${API_LINK}/users`;
export const SET_FCM_TOKEN = `${API_LINK}/fcm_token`;
export const RESET_PASSWORD = `${API_LINK}/reset_password`;
export const VERIFY_RESET_PASSWORD = `${API_LINK}/verify_reset_password`;
export const FCM_SEND_NOTIFICATION = 'https://fcm.googleapis.com/fcm/send';
export const CHECK_EMAIL = `${API_LINK}/signup/check_email`;
export const CHECK_USERNAME = `${API_LINK}/signup/check_username`;

export const getProfileUpdateLink = username => `${API_LINK}/${username}/update_info`;
export const getProfileImageUpdateLink = username => `${API_LINK}/${username}/update_profile_image`;
