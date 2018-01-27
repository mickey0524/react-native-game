import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  View,
  Text, 
  StyleSheet, 
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  AsyncStorage,
} from 'react-native';

import { OS, totalWidth, totalHeight } from '../../../../conf/deviceParam';
import GameCell from './GameCell';
import { ArticleOneImgCell, ArticleThreeImgCell } from './ArticleCell';
import { MyStatusBar } from '../../../common/MyStatusBar';
import BottomLoading from '../../../common/BottomLoading';
import { FEED } from '../../../../conf/api';
import { 
  fetchArticleHisotry,
  fetchGameHisotry,
  setArticleHistory,
  setGameHistory,
} from '../../../../dao/index';

class Feed extends Component {

  static navigationOptions = {
    tabBarLabel: '推荐',
  }

  constructor(props) {
    super(props);
    this.state = {
      feedData: [{}],
      isRefreshing: true,
      contentOffsetY: 0,
      // ifAnimated: true,
    }
    this.afterFirstFetch = false; // 第一次加载手动在cwm中执行，而不是Flatlist滚动到底部触发
    this.loadDirection = 0; // 判断当前是下拉刷新还是滑动到底部刷新
    this.isEndReached = false;
    this.fetchData = this.fetchData.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.onPressItem = this.onPressItem.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this._onScroll = this._onScroll.bind(this);
  }

  componentWillMount() {
    this.fetchData(0);
  }

  render() {
    let isNightMode = this.props.mode == 'night';
    return (
      <View style={[styles.container, { backgroundColor: isNightMode ? '#252525' : '#FFF'}]}>
        <FlatList
          onScroll={this._onScroll}
          refreshing={this.state.isRefreshing}
          onRefresh={() => this.fetchData(0)}
          ItemSeparatorComponent={() => <View style={[styles.ItemSeparator, {backgroundColor: isNightMode ? '#424242' : '#F4F5F6'}]} />}
          initialNumToRender={Math.ceil(totalHeight / 200)}
          data={this.state.feedData}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.2}
          onEndReached={this.afterFirstFetch ? this.onEndReached : null}
          renderItem={this.renderItem} />
      </View>
    );
  }

  /**
   * 滑动的时候记录列表滑动的距离
   * @param {object} ev 滑动事件对象
   */
  _onScroll(ev) {
    // 获取滑动的距离
    let { y } = ev.nativeEvent.contentOffset;
    this.setState({
      contentOffsetY: y > 0 ? y : 0,
    });
  }

  /**
   * 点击feed流item跳转详情页
   * @param {object} item feed流元素数据
   * @param {Number} index feed流元素的索引
   */
  onPressItem(item, index) {
    let feedData = this.state.feedData;
    feedData[index].isBrowered = true;
    this.setState({
      feedData,
    });
    const { navigate } = this.props.screenProps;
    if (item.type == 'article') {
      let articleId = /groupid=(.*)$/gi.exec(item.article_url)[1],
        articleName = item.title;
      let articleItem = {
        id: articleId,
        title: articleName,
        source: item.source,
        comment_num: item.comment_num,
        update_time: item.update_time,
      };
      fetchArticleHisotry().then(articleHistoryList => {
        if (!articleHistoryList) {
          articleHistoryList = [articleItem];
        } else {
          articleHistoryList = JSON.parse(articleHistoryList);
          articleHistoryList.unshift(articleItem);
        }
        setArticleHistory(JSON.stringify(articleHistoryList));
        navigate('ArticleDetail', { source: `https://open.toutiao.com/a${articleId}/`, articleName });
      });
    } else {
      let cardId = item.app_info.download_info.id,
        gameName = item.name;
      let gameItem = {
        id: cardId,
        name: gameName,
        title: item.title,
      };
      fetchGameHisotry().then(gameHistoryList => {
        if (!gameHistoryList) {
          gameHistoryList = [gameItem];
        } else {
          gameHistoryList = JSON.parse(gameHistoryList);
          gameHistoryList.unshift(gameItem);
        }
        setGameHistory(JSON.stringify(gameHistoryList));
        navigate('CardDetail', { cardId, gameName });
      });
    }
  }

  /**
   * 滚动到底部拉取数据
   */
  onEndReached() {
    if (this.isEndReached) {
      return;
    }
    this.isEndReached = true;
    this.fetchData(1);
  }

  /**
   * 从服务器拉取数据
   * @param {Number} dir 决定是加到数组的前面还是后面
   */
  fetchData(dir) {
    this.loadDirection = dir;
    let platform = OS == 'ios' ? '1' : '0';
    let url = `${FEED}&platform=${platform}`;
    if (!dir) {
      this.setState({
        isRefreshing: true,
      });
    }
    fetch(url).then(res => res.json()).then(res => {
      let curFeedData = this.state.feedData.slice(0, this.state.feedData.length - 1);
      Promise.all([ fetchArticleHisotry(), fetchGameHisotry() ]).then((value) => {
        let [articleHistory, gameHistory] = [ value[0] ? JSON.parse(value[0]) : [], value[1] ? JSON.parse(value[1]) : [] ];
        let newFeedData = res.data.map((item) => {
          let isFound = false;
          if (item.type == 'article') {
            for (let i = 0, len = articleHistory.length; i < len; i++) {
              if (articleHistory[i].id == /groupid=(.*)$/gi.exec(item.article_url)[1]) {
                isFound = true;
                break;
              }
            }
          } else {
            for (let i = 0, len = gameHistory.length; i < len; i++) {
              if (gameHistory[i].id == item.app_info.download_info.id) {
                isFound = true;
                break;
              }
            }
          }
          item.isBrowered = isFound;
          return item;
        });
        let feedData = dir ? [...curFeedData, ...res.data, {}] : [...res.data, ...newFeedData],
        isRefreshing = false;
        this.setState({
          feedData,
          isRefreshing,
        });
        if (dir) {
          this.isEndReached = false;
        }
        if (!this.afterFirstFetch) {
          this.afterFirstFetch = true;
        }
      });
    }).catch(err => {
      console.log(err);
    });
  }

  /**
   * 生成FlatList中的item
   * @param {object} param0 对象参数 
   */
  renderItem({ item, index }) {
    if (this.state.feedData.length == 1) {
      return null;
    }
    return (
        index == this.state.feedData.length - 1 ? <BottomLoading />
        : <TouchableWithoutFeedback onPress={() => this.onPressItem(item, index)}>
            <View>
              {
                item.type == 'card' ?
                  <GameCell
                    netInfo={this.props.netInfo}
                    loadImgWithoutWifi={this.props.loadImgWithoutWifi}
                    focusColor={this.props.theme.focusColor}
                    mode={this.props.mode}
                    gameInfo={item}
                    contentOffsetY={this.state.contentOffsetY}
                    loadDirection={this.loadDirection} />
                  : item.article_type == 3 ? 
                    <ArticleThreeImgCell
                      netInfo={this.props.netInfo}
                      loadImgWithoutWifi={this.props.loadImgWithoutWifi}
                      mode={this.props.mode}
                      articleInfo={item} 
                      contentOffsetY={this.state.contentOffsetY}
                      loadDirection={this.loadDirection} /> : 
                    <ArticleOneImgCell
                      netInfo={this.props.netInfo}
                      loadImgWithoutWifi={this.props.loadImgWithoutWifi}
                      mode={this.props.mode} 
                      articleInfo={item}
                      contentOffsetY={this.state.contentOffsetY}
                      loadDirection={this.loadDirection} />
              }
            </View>
          </TouchableWithoutFeedback>
      );
  }
}

const mapStateToProps = (state) => {
  let { mode, theme, netInfo, loadImgWithoutWifi } = state;
  return {
    mode,
    theme,
    netInfo,
    loadImgWithoutWifi,
  }
}

export default connect(mapStateToProps)(Feed);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFF',
    backgroundColor: 'red',
    width: totalWidth,
  },
  ItemSeparator: {
    // backgroundColor: '#F4F5F6',
    width: totalWidth,
    height: 6,
  },
});