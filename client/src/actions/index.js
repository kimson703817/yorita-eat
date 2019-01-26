import axios from 'axios';
import { FETCH_USER, COMPOSE_REQ_OBJECT } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/auth/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const composeReqObject = requestObject => {
  return {
    type: COMPOSE_REQ_OBJECT,
    requestObject
  };
};
