import {
  CHANGE_NETINFO,
  CHANGE_IF_LOAD_IMG_WHIYOUT_WIFI,
} from '../../conf/actionTypes';

function netInfo(state = 'nowifi', action) {
  switch (action.type) {
    case CHANGE_NETINFO:
      return action.netInfo;
      break;
    default:
      return state;
      break;
  }
}

function loadImgWithoutWifi(state = false, action) {
  switch (action.type) {
    case CHANGE_IF_LOAD_IMG_WHIYOUT_WIFI:
      return action.ifLoadImgWithoutWifi;
      break;
    default:
      return state;
      break;
  }
}

export {
  netInfo,
  loadImgWithoutWifi,
}