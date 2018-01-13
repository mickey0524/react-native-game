import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native';

import ToolBar from '../../common/ToolBar';
import { MyStatusBar } from '../../common/MyStatusBar';
import { fetchArticleHisotry, fetchGameHisotry } from '../../../dao/index';

const { width: totalWidth, height: totalHeight } = Dimensions.get('window');
const dpr = PixelRatio.get();

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
  }

  componentWillMount() {
    fetchArticleHisotry().then(data => {
      this.setState({
        articleList: JSON.parse(data),
      });
    });    
  }

  render() {
    let isNightMode = this.props.mode == 'day';
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
            <FlatList
              data={this.state.articleList}
              keyExtractor={(item, index) => index}
              initialNumToRender={7}
              ListFooterComponent={() => <View style={[styles.ItemSeparator, { backgroundColor: isNightMode ? '#424242' : '#E8E8E8' }]} />}
              ItemSeparatorComponent={() => <View style={[styles.ItemSeparator, { backgroundColor: isNightMode ? '#424242' : '#E8E8E8' }]} />}
              renderItem={this.renderArticleItem} /> :
            <FlatList
              data={this.state.gameList}
              keyExtractor={(item, index) => index}
              initialNumToRender={7}
              ListFooterComponent={() => <View style={[styles.ItemSeparator, { backgroundColor: isNightMode ? '#424242' : '#E8E8E8' }]} />}              
              ItemSeparatorComponent={() => <View style={[styles.ItemSeparator, { backgroundColor: isNightMode ? '#424242' : '#E8E8E8' }]} />}
              renderItem={this.renderGameItem} />
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
          param.gameList = JSON.parse(data);
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
    let isNightMode = this.props.mode == 'day';    
    let updateTime = /(.*):/gi.exec(item.update_time)[1];
    return (
      <View style={{ padding: 15 }}>
        <Text style={[styles.title, { color: isNightMode ? '#FFF' : '#222' }]}>{item.title}</Text>
        <View style={styles.articleInfo}>
          <Text style={[styles.articleInfoText, { color: isNightMode ? '#FFF' : '#999' }]}>{item.source}</Text>
          <Text style={[styles.articleInfoText, { color: isNightMode ? '#FFF' : '#999' }]}>{item.comment_num}评论</Text>
          <Text style={[styles.articleInfoText, { color: isNightMode ? '#FFF' : '#999' }]}>{updateTime}</Text>
        </View>
      </View>
    );
  }

  /**
   * 渲染游戏item
   * @param {Object} param0 游戏数据 
   */
  renderGameItem({ item, index }) {
    let isNightMode = this.props.mode == 'day';    
    return (
      <View style={{ padding: 15 }}>
        <Text style={[styles.title, { color: isNightMode ? '#FFF' : '#222' }]}>{item.title}</Text>
        <Text style={[styles.gameName, { color: isNightMode ? '#FFF' : '#999' }]}>{item.name}</Text>
      </View>
    )
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
})