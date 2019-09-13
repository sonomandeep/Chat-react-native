const initialState = { user: null };

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.user };

    case 'SET_SOCKET':
      return { ...state, socket: action.payload };

    default:
      return state;
  }
}
