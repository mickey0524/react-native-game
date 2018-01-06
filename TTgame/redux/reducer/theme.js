import {
  CHANGE_THEME_COLOR,
  CHANGE_FOCUS_COLOR,
} from '../../conf/actionTypes';

import color from '../../conf/color';

const initState = {
  themeColor: color.TT_RED,
  focusColor: color.SKY_BLUE,
}

export default function reducer(state = initState, action) {
  let newState = state;
  switch (action.type) {
    case CHANGE_THEME_COLOR:
      newState = Object.assign({}, state, { themeColor: action.color });
      return newState;
      break;
    case CHANGE_FOCUS_COLOR:
      newState = Object.assign({}, state, { focusColor: action.color });
      return newState;
      break;
    default:
      return state;
      break;
  }
}