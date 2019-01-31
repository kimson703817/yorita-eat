import { combineReducers } from 'redux';
import authReducer from './authReducer';
import requestDataReducer from './requestDataReducer';
import responseObjectReducer from './responseObjectReducer';

export default combineReducers({
  auth: authReducer,
  requestData: requestDataReducer,
  responseObjectReducer: responseObjectReducer
});
