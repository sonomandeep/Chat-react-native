const initialState = { users: null };

export default function chatReducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'GET_USERS':
      // return {};
      return { ...state, users: payload };
    default:
      return state;
  }
}
