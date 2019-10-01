import { getUsers } from '../../utils/api';

export const getUsersAction = _id => async (dispatch, getState) => {
  const state = getState();
  const activeUser = state.user.user;

  // try {
  //   let { users } = await getUsers(activeUser.token, _id);

  //   users = users.filter(({ user }) => user._id !== activeUser._id);
  //   dispatch({ type: 'GET_USERS', payload: users });
  // } catch (error) {
  //   console.log(error);
  //   return error;
  // }

  return new Promise((resolve, reject) => {
    getUsers(activeUser.token, _id)
      .then(({ users }) => {
        const filteredUsers = users.filter(({ user }) => user._id !== activeUser._id);
        dispatch({ type: 'GET_USERS', payload: filteredUsers });
        resolve();
      })
      .catch(error => reject(error));
  });
};

export const sendMessageAction = data => dispatch => {
  dispatch({ type: 'SEND_MESSAGE', payload: data });
};

export const receiveMessageAction = message => dispatch => {
  dispatch({ type: 'RECEIVE_MESSAGE', payload: message });
};

export const setMessageVisualizedAction = _id => dispatch => {
  dispatch({ type: 'MESSAGE_VISUALIZED', payload: _id });
};
