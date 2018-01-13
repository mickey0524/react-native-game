import {
  AsyncStorage,
} from 'react-native';

/**
 * 从AsyncStorage中读取文章访问记录
 */
export const fetchArticleHisotry = () => {
  return AsyncStorage.getItem('articleHistory');
}

/**
 * 将文章浏览历史写入AsyncStorage
 * @param {String} articleList JSON字符串
 */
export const setArticleHistory = (articleList) => {
  AsyncStorage.setItem('articleHistory', articleList);
}

/**
 * 从AsyncStorage中读取游戏访问记录
 */
export const fetchGameHisotry = () => {
  return AsyncStorage.getItem('gameHistory');
}

/**
 * 将文章浏览历史写入AsyncStorage
 * @param {String} gameList JSON字符串
 */
export const setGameHistory = (gameList) => {
  AsyncStorage.setItem('gameHistory', gameList);
}
