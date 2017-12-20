import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { GameCell } from './GameCell';
import { ArticleOneImgCell, ArticleThreeImgCell } from './ArticleCell';

import { FEED } from '../conf/api'; 

const Platform = require('Platform');
const Dimensions = require('Dimensions');

let totalWidth = Dimensions.get('window').width;
let totalHeight = Dimensions.get('window').height;
export default class Feed extends Component {

  static navigationOptions = {
    title: '今日游戏',
  };

  constructor(props) {
    super(props);
    this.state = {
      feedData: [],
      isRefreshing: false,
    }
    this.isEndReached = false;
    this.fetchData = this.fetchData.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.onPressItem = this.onPressItem.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  /**
   * 点击feed流item跳转详情页
   * @param {object} item feed流元素数据 
   */
  onPressItem(item) {
    const { navigate } = this.props.navigation;
    if (item.type == 'article') {
      let articleId = /groupid=(.*)$/gi.exec(item.article_url)[1];
      navigate('ArticleDetail', { source: `https://open.toutiao.com/a${articleId}/` });
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
    let platform = Platform.OS == 'ios' ? '1' : '0';
    let url = `${FEED}&platform=${platform}`;
    if (!dir) {
      this.setState({
        isRefreshing: true,
      });
    }
    fetch(url).then(res => res.json()).then(res => {      
      let feedData = dir ? [...this.state.feedData, ...res.data] : [...res.data, ...this.state.feedData],
        isRefreshing = false;
      if (dir) {
        this.isEndReached = false;
      }
      this.setState({
        feedData,
        isRefreshing,
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
  renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => this.onPressItem(item)}>
        {
          item.type == 'card' ? <GameCell gameInfo={item} />
            : item.article_type == 3 ? <ArticleThreeImgCell articleInfo={item} />
            : <ArticleOneImgCell articleInfo={item} />
        }
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          refreshing={this.state.isRefreshing}
          onRefresh={() => this.fetchData(0)}
          ItemSeparatorComponent={ () => <View style={styles.ItemSeparator} /> }
          // getItemLayout={(data, index) => ({ length: 345, offset: 351 * index, index})}
          initialNumToRender={ Math.ceil(totalHeight / 200) }
          data={this.state.feedData}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.2}
          onEndReached={this.onEndReached}
          renderItem={this.renderItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: totalWidth,
  },
  ItemSeparator: {
    backgroundColor: '#F4F5F6',
    width: totalWidth,
    height: 6,
  },
});