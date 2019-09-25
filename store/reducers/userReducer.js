const initialState = { user: null };

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'LOGIN':
      return { ...state, user: { ...payload } };

    case 'SIGNUP':
      return { ...state, user: { ...payload } };

    case 'SET_FCM_TOKEN':
      return { ...state, fcmToken: payload };

    default:
      return state;
  }
}
