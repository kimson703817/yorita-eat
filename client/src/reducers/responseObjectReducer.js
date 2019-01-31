import { SEND_REQUEST } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case SEND_REQUEST:
      return action.responseObject;
    default:
      return state;
  }
}
