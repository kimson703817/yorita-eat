import { COMPOSE_REQ_OBJECT, ON_REQ_SENT } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case COMPOSE_REQ_OBJECT:
      return action.requestData;
    case ON_REQ_SENT:
      return null;
    default:
      return state;
  }
};
