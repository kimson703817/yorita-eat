import { combineReducers } from 'redux';
import authReducer from './authReducer';
import requestObjectReducer from './requestObjectReducer';

export default combineReducers({
  auth: authReducer,
  requestObject: requestObjectReducer
});
