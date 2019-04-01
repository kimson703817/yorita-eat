import axios from 'axios';
import {
  FETCH_USER,
  COMPOSE_REQ_OBJECT,
  ON_REQ_SENT,
  SEND_REQUEST,
  FETCH_ORDER,
  ADD_TO_ORDER,
  REMOVE_FROM_ORDER,
  MODIFY_ORDER_QUANTITY,
  ON_CHECKOUT
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

export const modifyOrderQuantity = (id, newQty) => {
  let old = JSON.parse(localStorage.getItem('foodOrder'));
  if (!old) {
    return { type: null };
  }
  if (!old.items[id]) {
    return { type: null };
  }
  if (old.items[id].qty === newQty) {
    return { type: null };
  }

  const { price } = old.items[id];

  const updated = {
    ...old,
    items: { ...old.items },
    subtotal: old.subtotal - price * old.items[id].qty + price * newQty
  };
  updated.items[id] = { ...old.items[id], qty: newQty };

  localStorage.setItem('foodOrder', JSON.stringify(updated));

  return {
    type: MODIFY_ORDER_QUANTITY,
    order: updated
  };
};

/* IMPORTANT */
/* GO BACK TO ADD MORE ERROR CHECKING HERE LATER IF NEEDED */
export const addToOrder = (id, object, eateries_id) => {
  let updated = null;
  let items = null;
  let order = JSON.parse(localStorage.getItem('foodOrder'));
  if (object.qty === 0) return { type: null };

  if (!order) {
    items = {};
    items[id] = object;
    updated = { eateries_id, items, subtotal: object.qty * object.price };
  } else {
    if (order.eateries_id !== eateries_id) return { type: null };
    if (order.items[id]) return { type: null };

    updated = {
      ...order,
      items: { ...order.items },
      subtotal: (100 * (order.subtotal + object.qty * object.price)) / 100
    };
    updated.items[id] = object;
  }

  localStorage.setItem('foodOrder', JSON.stringify(updated));
  return {
    type: ADD_TO_ORDER,
    order: updated
  };
};

export const addToOrderV1 = (id, object, eateries_id) => {
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
  const updatedSubtotal =
    (100 * (order.subtotal - order.items[id].qty * order.items[id].price)) /
    100;
  const updated = {
    ...order,
    items: { ...order.items },
    subtotal: updatedSubtotal
  };
  delete updated.items[id];

  localStorage.setItem('foodOrder', JSON.stringify(updated));
  return {
    type: REMOVE_FROM_ORDER,
    order: updated
  };
};

export const fetchOrder = () => {
  const order = JSON.parse(localStorage.getItem('foodOrder'));
  return {
    type: FETCH_ORDER,
    order
  };
};

export const onCheckout = res => {
  localStorage.removeItem('foodOrder');
  return {
    type: ON_CHECKOUT,
    res
  };
};
