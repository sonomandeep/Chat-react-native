const initialState = { users: null };

export default function chatReducer(state = initialState, { type, payload }) {
  let users = null;

  switch (type) {
    case 'GET_USERS':
      return { ...state, users: payload };

    case 'SEND_MESSAGE':
      users = [...state.users];
      users.map(u => u.user._id === payload.receiverUserID && u.messages.push(payload));

      return {
        ...state,
        users,
      };

    case 'RECEIVE_MESSAGE':
      // eslint-disable-next-line no-case-declarations
      users = [...state.users];
      users.map(u => u.user._id === payload.senderUserID && u.messages.push(payload));

      return {
        ...state,
        users,
      };

    default:
      return state;
  }
}
