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
      console.log('Payload:', payload);
      users = state.users.filter(u => u.user._id !== payload.senderUserID);
      user = state.users.find(u => u.user._id === payload.senderUserID);

      users = [
        { ...user, messages: [payload, ...user.messages], lastMessage: { ...payload } },
        ...users,
      ];

      // users = state.users.map(u => {
      //   if (u.user._id === payload.senderUserID) {
      //     return { ...u, messages: [payload, ...u.messages], lastMessage: { ...payload } };
      //   }
      //   return u;
      // });

      return {
        ...state,
        users,
      };

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

    default:
      return state;
  }
}
