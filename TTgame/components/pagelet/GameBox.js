import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  PixelRatio,
} from 'react-native';

import { MyStatusBar, STATUSBAR_HEIGHT } from '../common/MyStatusBar';
import ToolBar from '../common/ToolBar';
import BottomLoading from '../common/BottomLoading';
import color from '../../conf/color';
import { GAME_BOX } from '../../conf/api';
import { getImgUrl } from '../../utils/util';

const { width: totalWidth, height: totalHeight } = Dimensions.get('window');
const platform = Platform.OS === 'ios' ? 1 : 0;
const dpr = PixelRatio.get();

export default class GameBox extends Component {
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
  } 
  
  componentWillMount() {
    this.fetchData();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar backgroundColor={color.SKY_BLUE} barStyle={'light-content'} />
        <ToolBar title={this.gameBoxName} navigation={this.props.navigation} leftIcon={'back'} />
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
            ItemSeparatorComponent={() => <View style={styles.ItemSeparator} />}
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
   * 点击游戏跳转游戏详情页
   * @param {string} gameName 游戏名
   */
  onPressItem(gameName) {
    const { navigate } = this.props.navigation;
    navigate('CardDetail', { gameName });
  }

  /**
   * 渲染item
   * @param {object} param0 游戏item数据
   */
  renderItem({item, index}) {
    return (
      index == this.state.gameList.length - 1 ?
        (this.state.hasMore ? <BottomLoading /> : null) :
        <TouchableWithoutFeedback onPress={() => this.onPressItem(item.name)}>
          <View style={styles.gameItem}> 
            <Image source={{ uri: getImgUrl(item.avatar, 'GAME_BOX_ICON') }} style={styles.gameIcon}/> 
            <View style={styles.gameInfo}>
              <Text numberOfLines={1} style={styles.gameName}>{item.name}</Text>
              <Text numberOfLines={1} style={styles.gameDesc}>{item.size}</Text>
              <Text numberOfLines={1} style={styles.gameDesc}>{item.desc}</Text>
            </View>
            <View style={styles.downloadWrap}>
              <Text style={styles.download}>下载</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  maskWrap: {
    width: totalWidth,
    height: totalHeight - 50 - STATUSBAR_HEIGHT,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ItemSeparator: {
    backgroundColor: '#E8E8E8',
    width: totalWidth,
    height: 1 / dpr,
  },
  gameItem: {
    display: 'flex',
    height: 104,
    width: totalWidth,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  gameIcon: {
    width: 74,
    height: 74,
    backgroundColor: '#F4F5F6',
    marginRight: 10,
    borderRadius: 12,
  },
  gameInfo: {
    height: 70,
    display: 'flex',
    paddingVertical: 2,
    justifyContent: 'space-between',
    width: 191,
    marginRight: 12,
  },
  gameName: {
    fontSize: 17,
    color: '#222',
  },
  gameDesc: {
    fontSize: 14,
    color: '#999',
  },
  downloadWrap: {
    width: 58,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#498FD2',
    borderRadius: 4,
    overflow: 'hidden',
  },
  download: {
    fontSize: 14,
    color: '#FFF',
  },
});