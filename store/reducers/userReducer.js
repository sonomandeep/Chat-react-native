const initialState = { user: null };

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.user };

    case 'SET_FCM_TOKEN':
      return { ...state, fcmToken: action.payload };

    default:
      return state;
  }
}
