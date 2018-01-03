import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  SectionList,
  ActivityIndicator,
  StyleSheet,
  Platform,
  Dimensions,
  PixelRatio,
  TouchableWithoutFeedback,
} from 'react-native';

import { MyStatusBar, STATUSBAR_HEIGHT } from '../../common/MyStatusBar';
import { RANK_HOT, RANK_NEW } from '../../../conf/api';
import { getImgUrl } from '../../../utils/util';

const platform = Platform.OS === 'ios' ? '1' : '0';
const { width: totalWidth, height: totalHeight } = Dimensions.get('window');
const dpr = PixelRatio.get();

export default class Rank extends Component {

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
  }

  componentDidMount() {
    this.fetchData();
  }
  
  render() {
    return (
      <View style={styles.container}>
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
            ItemSeparatorComponent={() => <View style={styles.ItemSeparator} />}
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
    return (
      <TouchableWithoutFeedback onPress={() => this.onPressGameItem(item)}>
        <View style={styles.itemWrap}>
          {
            index == 0 ? <Image source={require('../../../assets/ic_game_no.1.png')} style={styles.rankIcon} />
              : index == 1 ? <Image source={require('../../../assets/ic_game_no.2.png')} style={styles.rankIcon} />
                : index == 2 ? <Image source={require('../../../assets/ic_game_no.3.png')} style={styles.rankIcon} />
                  : <Text style={styles.rankText}>{index + 1}</Text>
          }
          <Image source={{ uri: item.avatar }} style={styles.gameIcon} />
          <View style={styles.gameInfo}>
            <Text numberOfLines={1} style={styles.gameName}>{item.name}</Text>
            <Text numberOfLines={1} style={styles.gameDesc}>大小：{item.size}</Text>
            <Text numberOfLines={1} style={styles.gameDesc}>{item.desc}</Text>              
          </View>
          <View style={styles.downloadWrap}>
            <Text style={styles.download}>下载</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  /**
   * 渲染section的头部
   */
  renderSectionHeader({ section }) {
    return (
      <View style={styles.sectionHeader}>
        <Text>{section.title}</Text>
      </View>
    );
  }

  /**
   * 点击游戏跳转详情页
   * @param {object} item 游戏item
   */
  onPressGameItem(item) {
    let gameName = item.download_info.name,
      cardId = item.download_info.id,
      { navigate } = this.props.screenProps;
    navigate('CardDetail', { cardId, gameName });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  maskWrap: {
    width: totalWidth,
    height: totalHeight - 90 - STATUSBAR_HEIGHT,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ItemSeparator: {
    backgroundColor: '#E8E8E8',
    width: totalWidth,
    height: 1 / dpr,
  },
  sectionHeader: {
    backgroundColor: '#F4F5F6',
    height: 28,
    width: totalWidth,
    paddingLeft: 15,
    display: 'flex',
    justifyContent: 'center',
  },
  itemWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingRight: 15,
    paddingLeft: 11,
  },
  rankIcon: {
    width: 24,
    height: 24,
    marginRight: 11,
  },
  rankText: {
    marginRight: 11,
    fontSize: 18,
    color: '#999',
    width: 24,
    textAlign: 'center',
  },
  gameIcon: {
    width: 66,
    height: 66,
    borderRadius: 12,
    backgroundColor: '#F4F5F6',
    marginRight: 10,
  },
  gameInfo: {
    width: 170,
    marginRight: 10,
  },
  gameName: {
    fontSize: 15,
    color: '#222',
  },
  gameDesc: {
    fontSize: 14,
    color: '#999',
    marginTop: 6,
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