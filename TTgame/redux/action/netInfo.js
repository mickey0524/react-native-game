import {
  CHANGE_NETINFO,
  CHANGE_IF_LOAD_IMG_WHIYOUT_WIFI,
} from '../../conf/actionTypes';

import { fetchLoadImgMode } from '../../dao';

/**
 * 修改redux中的netinfo
 * @param {object} theme 修改后的netinfo
 */
export const changeNetInfo = (netInfo) => {
  return {
    type: CHANGE_NETINFO,
    netInfo,
  }
}

export const changeLoadImgMode = (ifLoadImgWithoutWifi) => {
  return {
    type: CHANGE_IF_LOAD_IMG_WHIYOUT_WIFI,
    ifLoadImgWithoutWifi,
  }
}

/**
 * 打开app的时候设置loading图片的模式
 */
export const setLoadImgMode = () => {
  return dispatch => {
    fetchLoadImgMode().then(data => {
      if (data !== null) {
        let ifLoadImgWithoutWifi = data == 'true';
        dispatch(changeLoadImgMode(ifLoadImgWithoutWifi));
      }
    });
  }
}