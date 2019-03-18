import { MODIFY_ORDER } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case MODIFY_ORDER:
      // console.log('yo yo');
      return action.order;
    default:
      return state;
  }
};
