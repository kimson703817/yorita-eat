import { COMPOSE_REQ_OBJECT } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case COMPOSE_REQ_OBJECT:
      console.log(action.requestObject);
      return action.requestObject;
    default:
      return state;
  }
};
