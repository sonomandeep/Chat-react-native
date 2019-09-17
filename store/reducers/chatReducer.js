const initialState = { users: null };

export default function chatReducer(state = initialState, { type, payload }) {
  let users = null;
  let user = null;
  let messages = null;
  let visualizedMessages = null;

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
      users = [...state.users];
      users.map(u => u.user._id === payload.senderUserID && u.messages.push(payload));

      return {
        ...state,
        users,
      };

    case 'MESSAGE_VISUALIZED':
      user = state.users.find(u => u.user._id === payload.receiver);
      users = state.users.filter(u => u.user._id !== user.user._id);
      messages = [...user.messages];

      visualizedMessages = messages.map(m =>
        m.isVisualized ? { ...m } : { ...m, isVisualized: true }
      );

      user.messages = [...visualizedMessages];
      users = [...users, user];

      return { ...state, users };

    default:
      return state;
  }
}
