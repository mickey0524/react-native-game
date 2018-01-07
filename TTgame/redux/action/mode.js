import {
  CHANGE_MODE,
} from '../../conf/actionTypes';

import { fetchMode } from '../../dao';

/**
 * 修改redux中的mode
 * @param {string} mode 修改后的工作模式
 */
export const changeMode = (mode) => {
  return {
    type: CHANGE_MODE,
    mode,
  }
}

/**
 * 打开app的时候设置mode
 */
export const setMode = () => {
  return dispatch => {
    fetchMode().then(mode => {
      if (mode) {
        dispatch(changeMode(mode));
      }
    });
  }
}