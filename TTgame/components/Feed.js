import React, { Component } from 'react';
import { 
  View,
  Text, 
  StyleSheet, 
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';

import { GameCell } from './GameCell';
import { ArticleOneImgCell, ArticleThreeImgCell } from './ArticleCell';
import BottomLoading from '../components/BottomLoading';
import MyStatusBar from '../components/MyStatusBar';
import ToolBar from '../components/ToolBar';
import { SKY_BLUE } from '../conf/color';
import { FEED } from '../conf/api'; 

const { width: totalWidth, height: totalHeight } = Dimensions.get('window');
export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedData: [],
      isRefreshing: true,
    }
    this.isEndReached = false;
    this.fetchData = this.fetchData.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.onPressItem = this.onPressItem.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar backgroundColor={SKY_BLUE} barStyle={'light-content'} />
        <ToolBar title={'今日游戏'} isLeftIconShow={false} />
        <FlatList
          refreshing={this.state.isRefreshing}
          onRefresh={() => this.fetchData(0)}
          ItemSeparatorComponent={() => <View style={styles.ItemSeparator} />}
          initialNumToRender={Math.ceil(totalHeight / 200)}
          data={this.state.feedData}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.2}
          onEndReached={this.onEndReached}
          renderItem={this.renderItem} />
      </View>
    );
  }

  /**
   * 点击feed流item跳转详情页
   * @param {object} item feed流元素数据 
   */
  onPressItem(item) {
    const { navigate } = this.props.navigation;
    if (item.type == 'article') {
      let articleId = /groupid=(.*)$/gi.exec(item.article_url)[1],
        articleName = item.title;
      navigate('ArticleDetail', { source: `https://open.toutiao.com/a${articleId}/`, articleName });
    } else {
      let cardId = item.app_info.download_info.id,
        gameName = item.name;
      navigate('CardDetail', { cardId, gameName });
    }
  }

  /**
   * 滚动到底部拉取数据
   */
  onEndReached() {
    if (this.state.isEndReached) {
      return;
    }
    this.setState({
      isEndReached: true,
    });
    // this.isEndReached = true;
    this.fetchData(1);
  }

  /**
   * 从服务器拉取数据
   * @param {Number} dir 决定是加到数组的前面还是后面
   */
  fetchData(dir) {
    let platform = Platform.OS == 'ios' ? '1' : '0';
    let url = `${FEED}&platform=${platform}`;
    if (!dir) {
      this.setState({
        isRefreshing: true,
      });
    }
    fetch(url).then(res => res.json()).then(res => {
      let feedData = dir ? [...this.state.feedData, ...res.data] : [...res.data, ...this.state.feedData],
        isRefreshing = false,
        isEndReached = false;
      // if (dir) {
      //   this.isEndReached = false;
      // }
      this.setState({
        feedData,
        isRefreshing,
        isEndReached,
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  /**
   * 生成FlatList中的item
   * @param {object} param0 对象参数 
   */
  renderItem({ item, index }) {
    return (
      index == this.state.feedData.length - 1 && this.state.isEndReached ? <BottomLoading />
        : <TouchableOpacity onPress={() => this.onPressItem(item)}>
            {
              item.type == 'card' ? <GameCell gameInfo={item} />
                : item.article_type == 3 ? <ArticleThreeImgCell articleInfo={item} />
                : <ArticleOneImgCell articleInfo={item} />
            }
          </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: totalWidth,
  },
  ItemSeparator: {
    backgroundColor: '#F4F5F6',
    width: totalWidth,
    height: 6,
  },
});