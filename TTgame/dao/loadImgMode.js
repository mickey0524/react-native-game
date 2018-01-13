import {
  AsyncStorage,
} from 'react-native';

/**
 * 从AsyncStorage中读取loadImgMode
 */
export const fetchLoadImgMode = () => {
  return AsyncStorage.getItem('loadImgWithoutWifi');
}

/**
 * 设置读取图片的模式
 * @param {String} loadImgMode 'true'/'false'
 */
export const setLoadImgMode = (loadImgMode) => {
  AsyncStorage.setItem('loadImgWithoutWifi', loadImgMode);
}
