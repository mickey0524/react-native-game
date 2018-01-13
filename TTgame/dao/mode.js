import {
  AsyncStorage,
} from 'react-native';

/**
 * 从AsyncStorage中读取mode
 */
export const fetchMode = () => {
  return AsyncStorage.getItem('mode');
}

/**
 * 向AsyncStorage中写mode
 * @param {String} mode 模式 
 */
export const setMode = (mode) => {
  AsyncStorage.setItem('mode', mode);
}