const Platform = require('Platform');
const PixelRatio = require('PixelRatio').get();
const isIos = Platform.OS == 'ios';

import imageSize from '../conf/imageSize';

/**
 * 获取完整的图片
 * @param {string} url 原始图片url
 * @param {string} mark 标识 
 */
const getImgUrl = (url, mark) => {
  let { width, height } = imageSize[mark];
  url = url.replace(/^(http\:)/gi, $0 => 'https:');
  let format = /\.([a-zA-Z]+?)$/gi.exec(url)[1];
  width = width * PixelRatio;
  height = height * PixelRatio;
  return `${url}~${width}x${height}.${format}`;
}

export {
  getImgUrl,
}