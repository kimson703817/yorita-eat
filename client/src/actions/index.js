import axios from 'axios';
import {
  FETCH_USER,
  COMPOSE_REQ_OBJECT,
  ON_REQ_SENT,
  SEND_REQUEST,
  FETCH_ORDER,
  ADD_TO_ORDER,
  REMOVE_FROM_ORDER,
  MODIFY_ORDER_QUANTITY
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

export const modifyOrderQuantity = (id, qty) => {
  let order = JSON.parse(localStorage.getItem('foodOrder'));
  const item = order[id];
  if (!order) {
    return { type: null };
  }
  if (!item) {
    return { type: null };
  }
  if (item.qty === qty) {
    return { type: null };
  }
  let updatedSubtotal = order.subtotal - item.price * item.qty;
  updatedSubtotal += item.price * qty;
  const updatedOrder = Object.assign({}, order);
  updatedOrder[id].qty = qty;
  updatedOrder.subtotal = updatedSubtotal;
  localStorage.setItem('foodOrder', JSON.stringify(updatedOrder));

  return {
    type: MODIFY_ORDER_QUANTITY,
    order: updatedOrder
  };
};

/* IMPORTANT */
/* GO BACK TO ADD MORE ERROR CHECKING HERE LATER IF NEEDED */
export const addToOrder = (id, object, eateries_id) => {
  let updatedOrder = null;
  let order = JSON.parse(localStorage.getItem('foodOrder'));
  if (object.qty === 0) return { type: null };

  if (!order) {
    updatedOrder = {};
    updatedOrder[id] = object;
    updatedOrder.subtotal = object.qty * object.price;
    updatedOrder.eateries_id = eateries_id;
  } else {
    if (order.eateries_id !== eateries_id) return { type: null };
    updatedOrder = Object.assign({}, order);
    updatedOrder[id] = object;

    updatedOrder.subtotal += object.qty * object.price;
  }

  localStorage.setItem('foodOrder', JSON.stringify(updatedOrder));
  return {
    type: ADD_TO_ORDER,
    order: updatedOrder
  };
};

export const removeFromOrder = id => {
  const order = JSON.parse(localStorage.getItem('foodOrder'));
  if (!order) return;
  const updatedSubtotal = order.subtotal - order[id].qty * order[id].price;
  delete order[id];
  const updatedOrder = Object.assign({}, order);

  updatedOrder.subtotal = updatedSubtotal;
  localStorage.setItem('foodOrder', JSON.stringify(updatedOrder));
  return {
    type: REMOVE_FROM_ORDER,
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
