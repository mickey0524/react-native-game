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

/**
 * 从AsyncStorage中读取loadImgMode
 */
export const fetchLoadImgMode = () => {
  return AsyncStorage.getItem('loadImgWithoutWifi');
}

/**
 * 从AsyncStorage中读取文章访问记录
 */
export const fetchArticleHisotry = () => {
  return AsyncStorage.getItem('articleHistory');
}

/**
 * 从AsyncStorage中读取游戏访问记录
 */
export const fetchGameHisotry = () => {
  return AsyncStorage.getItem('gameHistory');
}