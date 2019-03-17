import axios from 'axios';
import {
  FETCH_USER,
  COMPOSE_REQ_OBJECT,
  ON_REQ_SENT,
  SEND_REQUEST,
  MODIFY_ORDER
} from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/auth/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const composeReqObject = requestData => {
  return {
    type: COMPOSE_REQ_OBJECT,
    requestData
  };
};

export const onRequestSent = () => ({
  type: ON_REQ_SENT
});

export const sendRequest = req => async dispatch => {
  const responseObject = await axios(req);
  dispatch({
    type: SEND_REQUEST,
    responseObject
  });
  dispatch({
    type: ON_REQ_SENT
  });
};

export const modifyOrder = order => ({
  type: MODIFY_ORDER,
  order
});
