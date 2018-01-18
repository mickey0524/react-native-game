import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import ToolBar from '../../common/ToolBar';
import { MyStatusBar, STATUSBAR_HEIGHT } from '../../common/MyStatusBar';
import { fetchArticleHisotry, fetchGameHisotry } from '../../../dao/index';
import { totalWidth, totalHeight, dpr } from '../../../conf/deviceParam'; 

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: 'article',
      articleList: [],
      gameList: [],
    }
    this.onPressLabelItem = this.onPressLabelItem.bind(this);
    this.renderArticleItem = this.renderArticleItem.bind(this);
    this.renderGameItem = this.renderGameItem.bind(this);
    this.onPressItem = this.onPressItem.bind(this);
  }

  componentWillMount() {
    fetchArticleHisotry().then(data => {
      if (data) {
        this.setState({
          articleList: JSON.parse(data),
        });
      }
    });    
  }

  render() {
    let isNightMode = this.props.mode == 'night';
    return (
      <View style={{ flex: 1, backgroundColor: isNightMode ? '#252525' : '#FFF' }}>
        <MyStatusBar />
        <ToolBar title={'足迹'} navigation={this.props.navigation} leftIcon={'back'} />
        <View style={[styles.label, { backgroundColor: this.props.theme.themeColor }]}>
          <Text
            onPress={() => this.onPressLabelItem('article') }
            style={[styles.labelText, this.state.label == 'article' && { opacity: 1 }]}>
            文章
          </Text>
          <Text
            onPress={() => this.onPressLabelItem('game') }
            style={[styles.labelText, this.state.label == 'game' && { opacity: 1 }]}>
            游戏
          </Text>
        </View>
        <View>
          {
            this.state.label == 'article' ?
            <View>
              {
                this.state.articleList.length > 0 ?
                  <FlatList
                    style={{ height: totalHeight - STATUSBAR_HEIGHT - 90 }}
                    data={this.state.articleList}
                    keyExtractor={(item, index) => index}
                    initialNumToRender={7}
                    ListFooterComponent={() => <View style={[styles.ItemSeparator, { backgroundColor: isNightMode ? '#424242' : '#E8E8E8' }]} />}
                    ItemSeparatorComponent={() => <View style={[styles.ItemSeparator, { backgroundColor: isNightMode ? '#424242' : '#E8E8E8' }]} />}
                    renderItem={this.renderArticleItem} /> :
                  <Text style={[styles.noHistory, { color: isNightMode ? '#FFF' : '#000' }]}>暂时没有任何足迹</Text>
              }
            </View> :
            <View> 
              {
                this.state.gameList.length > 0 ?
                  <FlatList
                    style={{ height: totalHeight - STATUSBAR_HEIGHT - 90 }}              
                    data={this.state.gameList}
                    keyExtractor={(item, index) => index}
                    initialNumToRender={7}
                    ListFooterComponent={() => <View style={[styles.ItemSeparator, { backgroundColor: isNightMode ? '#424242' : '#E8E8E8' }]} />}              
                    ItemSeparatorComponent={() => <View style={[styles.ItemSeparator, { backgroundColor: isNightMode ? '#424242' : '#E8E8E8' }]} />}
                    renderItem={this.renderGameItem} /> :
                  <Text style={[styles.noHistory, { color: isNightMode ? '#FFF' : '#000' }]}>暂时没有任何足迹</Text>
              }
            </View>
          }
        </View>
      </View>
    );
  }

  /**
   * 点击顶部分类
   * @param {String} mark 
   */
  onPressLabelItem(mark) {
    if (this.state.label != mark) {
      let param = {
        label: mark,
      };
      if (mark == 'game' && this.state.gameList.length == 0) {
        fetchGameHisotry().then(data => {
          if (data) {
            param.gameList = JSON.parse(data);
          }
          this.setState(param);
        })
      } else {
        this.setState(param);
      }
    }
  }

  /**
   * 渲染文章item
   * @param {Object} param0 文章数据
   */
  renderArticleItem({ item, index }) {
    let isNightMode = this.props.mode == 'night';    
    let updateTime = /(.*):/gi.exec(item.update_time)[1];
    return (
      <TouchableWithoutFeedback onPress={() => this.onPressItem(item, 'article')}>
        <View style={{ padding: 15 }}>
          <Text style={[styles.title, { color: isNightMode ? '#FFF' : '#222' }]}>{item.title}</Text>
          <View style={styles.articleInfo}>
            <Text style={[styles.articleInfoText, { color: isNightMode ? '#FFF' : '#999' }]}>{item.source}</Text>
            <Text style={[styles.articleInfoText, { color: isNightMode ? '#FFF' : '#999' }]}>{item.comment_num}评论</Text>
            <Text style={[styles.articleInfoText, { color: isNightMode ? '#FFF' : '#999' }]}>{updateTime}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  /**
   * 渲染游戏item
   * @param {Object} param0 游戏数据 
   */
  renderGameItem({ item, index }) {
    let isNightMode = this.props.mode == 'night';    
    return (
      <TouchableWithoutFeedback onPress={() => this.onPressItem(item, 'game')}>
        <View style={{ padding: 15 }}>
          <Text style={[styles.title, { color: isNightMode ? '#FFF' : '#222' }]}>{item.title}</Text>
          <Text style={[styles.gameName, { color: isNightMode ? '#FFF' : '#999' }]}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  /**
   * 点击足迹中的item
   * @param {Object} item 列表中item的数据 
   * @param {String} mark 种类分别
   */
  onPressItem(item, mark) {
    let { navigate } = this.props.navigation;
    if (mark == 'article') {
      let { id: articleId, title: articleName } = item;
      navigate('ArticleDetail', { source: `https://open.toutiao.com/a${articleId}/`, articleName });
    } else {
      let { id: cardId, name: gameName } = item;
      navigate('CardDetail', { cardId, gameName });
    }
  }
}

const mapStateToProps = (state) => {
  let { mode, theme } = state;
  return {
    theme,
    mode,
  }
}

export default connect(mapStateToProps)(History);

const styles = StyleSheet.create({
  ItemSeparator: {
    width: totalWidth,
    height: 1 / dpr,
  },
  label: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#F4F5F6',
    borderBottomWidth: 1 / dpr,
  },
  // labelItem: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  labelText: {
    flex: 1,
    textAlign: 'center',
    lineHeight: 40,
    opacity: 0.8,
    fontSize: 15,
    color: '#FFF',
  },
  title: {
    fontSize: 19,
    marginBottom: 8,
  },
  articleInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleInfoText: {
    fontSize: 12,
    marginRight: 6,
  },
  gameName: {
    fontSize: 12,
    marginRight: 5,
  },
  noHistory: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 15,
  },
})