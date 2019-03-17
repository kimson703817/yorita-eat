import { combineReducers } from 'redux';
import authReducer from './authReducer';
import requestDataReducer from './requestDataReducer';
import responseObjectReducer from './responseObjectReducer';
import itemsOrderedReducer from './itemsOrderedReducer';

export default combineReducers({
  auth: authReducer,
  requestData: requestDataReducer,
  responseObject: responseObjectReducer,
  itemsOrdered: itemsOrderedReducer
});
