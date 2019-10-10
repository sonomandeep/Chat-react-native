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
      users = state.users.filter(u => u.user._id !== payload.receiverUserID);
      user = state.users.find(u => u.user._id === payload.receiverUserID);
      users = [
        { ...user, messages: [payload, ...user.messages], lastMessage: { ...payload } },
        ...users,
      ];

      return {
        ...state,
        users,
      };

    case 'RECEIVE_MESSAGE':
      users = state.users.filter(u => u.user._id !== payload.senderUserID);
      user = state.users.find(u => u.user._id === payload.senderUserID);

      users = [
        {
          ...user,
          messages: [payload, ...user.messages],
          lastMessage: { ...payload },
          toRead: true,
        },
        ...users,
      ];

      return {
        ...state,
        users,
      };

    case 'SET_TOREAD':
      users = state.users.map(u => {
        if (u.user._id === payload._id) {
          return { ...u, toRead: payload.value };
        }
        return u;
      });

      return { ...state, users };

    case 'MESSAGE_VISUALIZED':
      user = state.users.find(u => u.user._id === payload.sender);
      users = state.users.filter(u => u.user._id !== user.user._id);
      messages = [...user.messages];

      visualizedMessages = messages.map(m =>
        m.isVisualized ? { ...m } : { ...m, isVisualized: true }
      );

      user.messages = [...visualizedMessages];
      users = [...users, user];

      return { ...state, users };

    case 'SET_USER_ONLINE':
      users = state.users.map(u => {
        if (u.user._id === payload) {
          return { ...u, user: { ...u.user, isOnline: true } };
        }
        return u;
      });

      return { ...state, users };

    case 'SET_USER_OFFLINE':
      users = state.users.map(u => {
        if (u.user._id === payload) {
          return { ...u, user: { ...u.user, isOnline: false, lastAccess: Date.now() } };
        }
        return u;
      });

      return { ...state, users };

    default:
      return state;
  }
}
