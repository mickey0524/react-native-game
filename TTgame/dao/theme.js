import {
  AsyncStorage,
} from 'react-native';

/**
 * 从AsyncStorage中读取theme
 */
export const fetchTheme = () => {
  return AsyncStorage.getItem('theme');
}

/**
 * 将theme写入AsyncStorage
 * @param {String} theme 主题
 */
export const setTheme = (theme) => {
  AsyncStorage.setItem('theme', theme);
}