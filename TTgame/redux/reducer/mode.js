import {
  CHANGE_MODE,
} from '../../conf/actionTypes';

export default function reducer(state = 'day', action) {
  switch (action.type) {
    case CHANGE_MODE:
      return action.mode;
      break;
    default:
      return state;
      break;
  }
}