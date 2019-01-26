import { COMPOSE_REQ_OBJECT } from './action/types';

export default (state = null, action) => {
  switch (action.type) {
    case COMPOSE_REQ_OBJECT:
      return action.requestObject;
    default:
      return state;
  }
};
