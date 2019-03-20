import axios from 'axios';
import {
  FETCH_USER,
  COMPOSE_REQ_OBJECT,
  ON_REQ_SENT,
  SEND_REQUEST,
  MODIFY_ORDER,
  FETCH_ORDER,
  ADD_TO_ORDER
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

export const modifyOrder = object => {
  const order = JSON.stringify(object);
  return {
    type: MODIFY_ORDER,
    order
  };
};

export const addToOrder = (id, object) => {
  // const { id, name, price, key_img, cloudUrl, orderQty } = object;

  let updatedOrder = {};
  let order = JSON.parse(localStorage.getItem('foodOrder'));
  if (!order) {
    updatedOrder[id] = object;
  } else {
    if (order[id] === null && object.qty === 0) {
      console.log('in here');
      return;
    }
    console.log('out here');
    updatedOrder = Object.assign({}, order);
    updatedOrder[id] = object;
  }

  localStorage.setItem('foodOrder', JSON.stringify(updatedOrder));
  return {
    type: ADD_TO_ORDER,
    order: updatedOrder
  };
};

export const fetchOrder = () => {
  const order = JSON.parse(localStorage.getItem('foodOrder'));
  return {
    type: FETCH_ORDER,
    order
  };
};
