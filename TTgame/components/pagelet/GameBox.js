import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  Linking,
  ActionSheetIOS,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from 'react-native';

import ActionSheet from 'react-native-actionsheet';

import { OS, totalWidth, totalHeight, dpr, isAndroid } from '../../conf/deviceParam';
import { MyStatusBar, STATUSBAR_HEIGHT } from '../common/MyStatusBar';
import ToolBar from '../common/ToolBar';
import BottomLoading from '../common/BottomLoading';
import color from '../../conf/color';
import { GAME_BOX } from '../../conf/api';
import { getImgUrl } from '../../utils/util';

const platform = OS === 'ios' ? 1 : 0,
  URL_PREFIX = 'https://ic.snssdk.com/game_channel/game_box/',
  CANCEL_INDEX = 2,
  OPTIONS = ['在浏览器中打开', '分享', '取消'];

class GameBox extends Component {
  constructor(props) {
    super(props);
    this.gameBoxId = this.props.navigation.state.params.gameBoxId;
    this.gameBoxName = this.props.navigation.state.params.gameBoxName;
    this.state = {
      isLoading: true,
      hasMore: true,
      gameList: [{}],
    }
    this.fetchData = this.fetchData.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onPressToolBarMore = this.onPressToolBarMore.bind(this);
    this.handlePress = this.handlePress.bind(this);
  } 
  
  componentWillMount() {
    this.fetchData();
  }
  
  render() {
    let isNightMode = this.props.mode == 'night';
    return (
      <View style={[styles.container, { backgroundColor: isNightMode ? '#252525' : '#FFF'}]}>
        {
          isAndroid &&
          <ActionSheet
            ref={o => this.ActionSheet = o}
            options={OPTIONS}
            cancelButtonIndex={CANCEL_INDEX}
            onPress={this.handlePress} />
        }
        <MyStatusBar />
        <ToolBar title={this.gameBoxName}
          navigation={this.props.navigation}
          onPressToolBarMore={this.onPressToolBarMore}
          leftIcon={'back'}
          rightIcon={['more']} />
        {
          this.state.isLoading &&
          <View style={styles.maskWrap}>
            <ActivityIndicator />
          </View>
        }
        {
          !this.state.isLoading &&
          <FlatList
            data={this.state.gameList}
            keyExtractor={(item, index) => index}
            initialNumToRender={7}
            ItemSeparatorComponent={() => <View style={[styles.ItemSeparator, {backgroundColor: isNightMode ? '#424242' : '#E8E8E8'}]} />}
            renderItem={this.renderItem}
            onEndReachedThreshold={0.2}
            onEndReached={this.state.hasMore ? this.fetchData : false} />
        }
      </View>
    );
  }

  /**
   * 拉取游戏块数据
   */
  fetchData() {
    let url = `${GAME_BOX}&platform=${platform}&game_box_id=${this.gameBoxId}&offset=${this.state.gameList.length - 1}`;
    fetch(url).then(res => res.json()).then(res => {
      let newState = { 
        gameList: [...this.state.gameList.slice(0, this.state.gameList.length - 1), ...res.data, {}],
      }
      if (this.state.isLoading) {
        newState.isLoading = false;
      }
      if (res.has_more != this.state.hasMore) {
        newState.hasMore = res.has_more;
      }
      this.setState(newState);
    })
    .catch(err => {
      console.log(err);
    });
  }

  /**
   * 点击ActionSheet的回调函数
   * @param {Number} index button的索引 
   */
  handlePress(index) {
    if (index == 0) {
      Linking.openURL(`${URL_PREFIX}${this.gameBoxId}`);
    } else if (index == 1) {

    }
  }

  /**
   * 当点击toolBar上的more icon
   */
  onPressToolBarMore() {
    if (isAndroid) {
      this.ActionSheet.show();
    } else {
      ActionSheetIOS.showActionSheetWithOptions({
        options: OPTIONS,
        cancelButtonIndex: CANCEL_INDEX,
      }, this.handlePress);
    }
  }

  /**
   * 点击游戏跳转游戏详情页
   * @param {String} gameId 游戏id
   * @param {String} gameName 游戏名
   */
  onPressItem(gameId, gameName) {
    const { navigate } = this.props.navigation;
    navigate('CardDetail', { gameName, gameId });
  }

  /**
   * 点击下载
   * @param {String} downloadUrl 下载链接
   */
  onPressDownload(downloadUrl) {
    Linking.openURL(downloadUrl);
  }

  /**
   * 渲染item
   * @param {object} param0 游戏item数据
   */
  renderItem({item, index}) {
    let isNightMode = this.props.mode == 'night';
    return (
      index == this.state.gameList.length - 1 ?
        (this.state.hasMore ? <BottomLoading /> : null) :
        <TouchableWithoutFeedback onPress={() => this.onPressItem(item.download_info.id, item.name)}>
          <View style={styles.gameItem}> 
            <Image source={{ uri: getImgUrl(item.avatar, 'GAME_BOX_ICON') }}
              style={[styles.gameIcon, { backgroundColor: isNightMode ? '#000' : '#F4F5F6', overlayColor: isNightMode ? '#252525' : '#FFF'}]}/> 
            <View style={styles.gameInfo}>
              <Text numberOfLines={1} style={[styles.gameName, { color: isNightMode ? '#FFF' : '#222' }]}>{item.name}</Text>
              <Text numberOfLines={1} style={[styles.gameName, { color: isNightMode ? '#FFF' : '#999' }]}>{item.size}</Text>
              <Text numberOfLines={1} style={[styles.gameName, { color: isNightMode ? '#FFF' : '#999' }]}>{item.desc}</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => this.onPressDownload(item.download_info.download_url)}>
              <View style={[styles.downloadWrap, {backgroundColor: this.props.theme.focusColor}]}>
                <Text style={styles.download}>下载</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state) => {
  let { theme, mode } = state;
  return {
    theme,
    mode,
  };
}

export default connect(mapStateToProps)(GameBox);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFF',
  },
  maskWrap: {
    width: totalWidth,
    height: totalHeight - 50 - STATUSBAR_HEIGHT,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ItemSeparator: {
    // backgroundColor: '#E8E8E8',
    width: totalWidth,
    height: 1 / dpr,
  },
  gameItem: {
    display: 'flex',
    height: 104,
    width: totalWidth,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15 / 375 * totalWidth,
  },
  gameIcon: {
    width: 74 / 375 * totalWidth,
    height: 74 / 375 * totalWidth,
    // backgroundColor: '#F4F5F6',
    marginRight: 10 / 375 * totalWidth,
    borderRadius: 12,
  },
  gameInfo: {
    height: 70,
    display: 'flex',
    paddingVertical: 2,
    justifyContent: 'space-between',
    width: 191 / 375 * totalWidth,
    marginRight: 12 / 375 * totalWidth,
  },
  gameName: {
    fontSize: 17,
    // color: '#222',
  },
  gameDesc: {
    fontSize: 14,
    // color: '#999',
  },
  downloadWrap: {
    width: 58 / 375 * totalWidth,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#498FD2',
    borderRadius: 4,
    overflow: 'hidden',
  },
  download: {
    fontSize: 14,
    color: '#FFF',
  },
});