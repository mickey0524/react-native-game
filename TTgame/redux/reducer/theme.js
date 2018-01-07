import {
  CHANGE_THEME,
} from '../../conf/actionTypes';

import color from '../../conf/color';

const initState = {
  themeColor: color.SKY_BLUE,
  focusColor: color.SKY_BLUE,
}

export default function reducer(state = initState, action) {
  let newState = state;
  switch (action.type) {
    case CHANGE_THEME:
      return action.theme;
      break;
    default:
      return state;
      break;
  }
}