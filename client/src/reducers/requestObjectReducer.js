import { COMPOSE_REQ_OBJECT, SEND_REQUEST } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case COMPOSE_REQ_OBJECT:
      return action.requestObject;
    case SEND_REQUEST:
      return null;
    default:
      return state;
  }
};
