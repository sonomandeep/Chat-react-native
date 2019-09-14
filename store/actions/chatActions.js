import { getUsers } from '../../utils/api';

export const getUsersAction = _id => async (dispatch, getState) => {
  const state = getState();
  const activeUser = state.user.user;

  try {
    let { users } = await getUsers(_id);

    users = users.filter(({ user }) => user._id !== activeUser._id);

    dispatch({ type: 'GET_USERS', payload: users });
  } catch (error) {
    console.log('Errore durante la lettura degli utenti:', error);
  }
};

export const sendMessageAction = data => (dispatch, getState) => {
  const state = getState();
  const { users } = state.chat;
  users.map(u => u.user._id === data.receiverUserID && u.messages.push(data));

  dispatch({ type: 'SEND_MESSAGE', payload: users });
};

export const receiveMessageAction = message => (dispatch, getState) => {
  const state = getState();
  const { users } = state.chat;
  users.map(u => u.user._id === message.senderUserID && u.messages.push(message));

  dispatch({ type: 'RECEIVE_MESSAGE', payload: users });
};
