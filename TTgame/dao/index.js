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
 * 从AsyncStorage中读取mode
 */
export const fetchMode = () => {
  return AsyncStorage.getItem('mode');
}