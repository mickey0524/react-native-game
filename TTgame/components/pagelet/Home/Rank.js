import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import {
  View,
  Text,
  Image,
  SectionList,
  Linking,
  ActivityIndicator,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import { OS, totalWidth, totalHeight, dpr } from '../../../conf/deviceParam';
import { MyStatusBar, STATUSBAR_HEIGHT } from '../../common/MyStatusBar';
import { RANK_HOT, RANK_NEW } from '../../../conf/api';
import { getImgUrl } from '../../../utils/util';

const platform = OS === 'ios' ? '1' : '0';

class Rank extends Component {

  static navigationOptions = {
    tabBarLabel: '榜单',
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      rankData: [],
    };
    this.fetchData = this.fetchData.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onPressGameItem = this.onPressGameItem.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }
  
  render() {
    let isNightMode = this.props.mode == 'night';
    return (
      <View style={[styles.container, { backgroundColor: isNightMode ? '#252525' : '#FFF'}]}>
        {
          this.state.isLoading &&
          <View style={styles.maskWrap}>
            <ActivityIndicator />
          </View>
        }
        {
          !this.state.isLoading && 
          <SectionList
            sections={this.state.rankData}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={() => <View style={[styles.ItemSeparator, { backgroundColor: isNightMode ? '#424242' : '#E8E8E8'}]} />}
            renderSectionHeader={this.renderSectionHeader}
            renderItem={this.renderItem} />
        }
      </View>
    );
  }

  /**
   * 向服务端请求数据
   */
  fetchData() {
    let hotUrl = `${RANK_HOT}&platform=${platform}`,
      newUrl = `${RANK_NEW}&platform=${platform}`;
    let hotPromise = fetch(hotUrl).then(res => res.json()),
      newPromise = fetch(newUrl).then(res => res.json());
    Promise.all([ hotPromise, newPromise ]).then(dataArr => {
      dataArr[0].data = dataArr[0].data.map(item => {
        item.avatar = getImgUrl(item.avatar, 'RANK_ICON');
        return item;
      });
      dataArr[1].data = dataArr[1].data.map(item => {
        item.avatar = getImgUrl(item.avatar, 'RANK_ICON');
        return item;
      });
      this.setState({
        rankData: dataArr,
        isLoading: false,
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  /**
   * 渲染游戏Item
   * @param {object} param0 游戏obj 
   */
  renderItem({ item, index }) {
    let isNightMode = this.props.mode == 'night';
    return (
      <TouchableWithoutFeedback onPress={() => this.onPressGameItem(item)}>
        <View style={styles.itemWrap}>
          {
            index == 0 ? <Image source={require('../../../assets/ic_game_no.1.png')} style={styles.rankIcon} />
              : index == 1 ? <Image source={require('../../../assets/ic_game_no.2.png')} style={styles.rankIcon} />
                : index == 2 ? <Image source={require('../../../assets/ic_game_no.3.png')} style={styles.rankIcon} />
                  : <Text style={styles.rankText}>{index + 1}</Text>
          }
          <Image source={{ uri: item.avatar }} style={[styles.gameIcon, { backgroundColor: isNightMode ? '#000' : '#F4F5F6', overlayColor: isNightMode ? '#252525' : '#FFF'}]} />
          <View style={styles.gameInfo}>
            <Text numberOfLines={1} style={[styles.gameName, { color: isNightMode ? '#FFF' : '#222' }]}>{item.name}</Text>
            <Text numberOfLines={1} style={[styles.gameDesc, { color: isNightMode ? '#FFF' : '#999' }]}>大小：{item.size}</Text>
            <Text numberOfLines={1} style={[styles.gameDesc, { color: isNightMode ? '#FFF' : '#999' }]}>{item.desc}</Text>              
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

  /**
   * 渲染section的头部
   */
  renderSectionHeader({ section }) {
    let isNightMode = this.props.mode == 'night';
    return (
      <View style={[styles.sectionHeader, { backgroundColor: isNightMode ? '#424242' : '#F4F5F6'}]}>
        <Text style={{color: isNightMode ? '#FFF' : '#000'}}>{section.title}</Text>
      </View>
    );
  }

  /**
   * 点击游戏跳转详情页
   * @param {object} item 游戏item
   */
  onPressGameItem(item) {
    let gameName = item.download_info.name,
      gameId = item.download_info.id,
      { navigate } = this.props.screenProps;
    navigate('CardDetail', { gameId, gameName });
  }

  /**
   * 点击下载
   * @param {String} downloadUrl 下载链接
   */
  onPressDownload(downloadUrl) {
    Linking.openURL(downloadUrl);
  }
}

const mapStateToProps = (state) => {
  let { theme, mode } = state;
  return {
    theme,
    mode,
  };
}

export default connect(mapStateToProps)(Rank);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFF',
  },
  maskWrap: {
    width: totalWidth,
    height: totalHeight - 90 - STATUSBAR_HEIGHT,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ItemSeparator: {
    // backgroundColor: '#E8E8E8',
    width: totalWidth,
    height: 1 / dpr,
  },
  sectionHeader: {
    // backgroundColor: '#F4F5F6',
    height: 28,
    width: totalWidth,
    paddingLeft: 15 / 375 * totalWidth,
    display: 'flex',
    justifyContent: 'center',
  },
  itemWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15 / 375 * totalWidth,
    paddingRight: 15,
    paddingLeft: 11 / 375 * totalWidth,
  },
  rankIcon: {
    width: 24 / 375 * totalWidth,
    height: 24,
    marginRight: 11 / 375 * totalWidth,
  },
  rankText: {
    marginRight: 11 / 375 * totalWidth,
    fontSize: 18,
    color: '#999',
    width: 24 / 375 * totalWidth,
    textAlign: 'center',
  },
  gameIcon: {
    width: 66 / 375 * totalWidth,
    height: 66,
    borderRadius: 12,
    // backgroundColor: '#F4F5F6',
    marginRight: 10 / 375 * totalWidth,
  },
  gameInfo: {
    width: 170 / 375 * totalWidth,
    marginRight: 10,
  },
  gameName: {
    fontSize: 15,
    // color: '#222',
  },
  gameDesc: {
    fontSize: 14,
    color: '#999',
    marginTop: 6,
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