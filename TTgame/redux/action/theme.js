import { 
  CHANGE_THEME_COLOR,
  CHANGE_FOCUS_COLOR,
 } from '../../conf/actionTypes';

/**
 * 修改redux中的themeColor 
 * @param {string} themeColor 修改后的主题颜色 
 */
export const changeThemeColor = (themeColor) => {
  return {
    type: CHANGE_THEME_COLOR,
    color: themeColor,
  }
}

/**
 * 修改redux中的focusColor
 * @param {string} focusColor 修改后的强调颜色 
 */
export const changeFocusColor = (focusColor) => {
  return {
    type: CHANGE_FOCUS_COLOR,
    color: focusColor,
  }
}