import { combineReducers } from 'redux';
import authReducer from './auth';
import postReducer from './postReducer';

export default combineReducers({
  posts: postReducer,
  auth: authReducer,
});
