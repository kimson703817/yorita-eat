import { MODIFY_ORDER } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case MODIFY_ORDER:
      return action.order;
    default:
      return state;
  }
};
