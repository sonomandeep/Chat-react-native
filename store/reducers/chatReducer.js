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
      // eslint-disable-next-line no-case-declarations
      const users = [...state.users];
      users.map(u => u.user._id === payload.senderUserID && u.messages.push(payload));

      return {
        ...state,
        users,
      };

    default:
      return state;
  }
}
