const initialState = { users: null };

export default function chatReducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'GET_USERS':
      return { ...state, users: payload };

    case 'SEND_MESSAGE':
      return {
        ...state,
        users: payload,
      };

    case 'RECEIVE_MESSAGE':
      return {
        ...state,
        users: payload,
      };

    default:
      return state;
  }
}
