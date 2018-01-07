import { 
  CHANGE_THEME,
 } from '../../conf/actionTypes';

import { fetchTheme } from '../../dao';

/**
 * 修改redux中的theme
 * @param {object} theme 修改后的主题
 */
export const changeTheme = (theme) => {
  return {
    type: CHANGE_THEME,
    theme,
  }
}

/**
 * 打开app的时候设置theme
 */
export const setTheme = () => {
  return dispatch => {
    fetchTheme().then(data => {
      if (data) {
        dispatch(changeTheme(JSON.parse(data)));        
      }
    });
  }
}