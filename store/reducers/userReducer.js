const initialState = { user: '' };

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.user };

    default:
      return state;
  }
}
