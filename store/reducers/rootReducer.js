import { combineReducers } from 'redux';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
});

export default (state, action) =>
  action.type === 'LOGOUT' ? rootReducer(undefined, action) : rootReducer(state, action);
