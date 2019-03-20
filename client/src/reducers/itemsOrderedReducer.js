import { ADD_TO_ORDER, FETCH_ORDER } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case ADD_TO_ORDER:
      return action.order;
    case FETCH_ORDER:
      return action.order;
    default:
      return state;
  }
};
