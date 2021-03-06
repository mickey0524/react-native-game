import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  Linking,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

import Swiper from 'react-native-swiper';

import { totalWidth, totalHeight, OS } from '../../../conf/deviceParam';
import { MyStatusBar, STATUSBAR_HEIGHT } from '../../common/MyStatusBar';
import BottomLoading from '../../common/BottomLoading';
import { HALL } from '../../../conf/api';
import { getImgUrl } from '../../../utils/util';  

const platform = OS === 'ios' ? '1' : '0';

class Hall extends Component {

  static navigationOptions = {
    tabBarLabel: '大厅',
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      hasMore: true,
      swiperArr: [],
      hallData: [{}],
    };
    this.gameBoxIds = [];
    this.fetchData = this.fetchData.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onPressItem = this.onPressItem.bind(this);
    this.onPressShowMore = this.onPressShowMore.bind(this);
  }
  
  componentWillMount() {
    this.fetchData();      
  }
  
  render() {
    let isNightMode = this.props.mode == 'night';
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
          <View style={[styles.container, { backgroundColor: isNightMode ? '#252525' : '#FFF' }]}>
            <FlatList
              data={this.state.hallData}
              keyExtractor={(item, index) => index}
              ItemSeparatorComponent={() => <View style={[styles.ItemSeparator, { backgroundColor: isNightMode ? '#424242' : '#F4F5F6' }]} />}           
              renderItem={this.renderItem} 
              onEndReachedThreshold={0.2}
              onEndReached={this.state.hasMore ? this.fetchData : false} />
          </View>
        }
      </View>
    );
  }

  /**
   * 渲染列表块
   * @param {object} param0 列表块参数
   */
  renderItem({ item, index }) {
    let isNightMode = this.props.mode == 'night';
    if (this.state.hallData.length == 1) {
      return null;
    }
    return (
      index == this.state.hallData.length - 1 ? 
        this.state.hasMore ? <BottomLoading /> : null :
        <View>
          { index == 0 &&
            <Swiper autoplay={true} loadMinimal={false} height={140} autoplayTimeout={5}>
              {
                this.state.swiperArr.map((item, index) => {
                  return (
                    <TouchableWithoutFeedback key={index} onPress={() => this.onPressItem(item.link_url.split('/')[item.link_url.split('/').length - 1], item.title)}>
                      <Image source={{ uri: getImgUrl(item.image_url, 'HALL_SWIPER') }}
                        style={[styles.swiperItem, { backgroundColor: isNightMode ? '#000' : '#F4F5F6'}]} />
                    </TouchableWithoutFeedback>
                  );
                })
              }
            </Swiper>
          }
          {
            item.game_lists &&
            <View>
              <View style={styles.gameBoxTitleWrap}>
                <Text style={[styles.gameBoxTitle, { color: isNightMode ? '#FFF' : '#222' }]}>{item.title}</Text>
                <Text style={[styles.gameBoxTitle, { color: isNightMode ? '#FFF' : '#222' }]}
                  onPress={() => this.onPressShowMore(item.game_box_id, item.title)}>
                  查看全部
                </Text>
              </View>
              <View style={styles.gameList}>
                {
                  item.game_lists.map((game, gameIndex) => {
                    return (
                      <TouchableWithoutFeedback key={gameIndex} onPress={() => this.onPressItem(game.download_info.id, game.name)}>
                        <View style={[styles.gameItem, (gameIndex + 1) % 4 == 0 && { marginRight: 0 }]}>
                          <Image style={[styles.gameIcon, { backgroundColor: isNightMode ? '#000' : '#F4F5F6', overlayColor: isNightMode ? '#252525' : '#FFF' }]} source={{ uri: getImgUrl(game.avatar, 'HALL_ICON') }}/>
                          <Text numberOfLines={1} style={[styles.gameName, {color: isNightMode ? '#FFF' : '#222'}]}>{ game.name }</Text>
                          <Text numberOfLines={1} style={[styles.gameSize, {color: isNightMode ? '#FFF' : '#999'}]}>{ game.size }</Text>
                          <TouchableWithoutFeedback onPress={() => this.onPressDownload(game.download_info.download_url)}>
                            <View style={[styles.downloadWrap, { backgroundColor: this.props.theme.focusColor}]}>
                              <Text style={styles.download}>下载</Text>
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })
                }
              </View>
              <View style={[styles.bannerWrap, { borderColor: isNightMode ? '#424242' : '#F4F5F6' }]}>
                {
                  item.game_banner.length == 1 ?
                    <TouchableWithoutFeedback onPress={() => {this.onPressItem(item.game_banner[0].link_url.split('/')[item.game_banner[0].link_url.split('/').length - 1], item.game_banner[0].title)}}>
                    <Image style={[styles.bigBanner, { backgroundColor: isNightMode ? '#000' : '#F4F5F6' }]}
                      source={{ uri: getImgUrl(item.game_banner[0].image_url, 'HALL_BIG_BANNER') }} />
                  </TouchableWithoutFeedback> :
                  <View style={styles.smallBannerWrap}>
                    <TouchableWithoutFeedback onPress={() => {this.onPressItem(item.game_banner[0].link_url.split('/')[item.game_banner[0].link_url.split('/').length - 1], item.game_banner[0].title)}}>
                      <Image style={[styles.smallBanner, { backgroundColor: isNightMode ? '#000' : '#F4F5F6', overlayColor: isNightMode ? '#252525' : '#FFF' }]}
                        source={{ uri: getImgUrl(item.game_banner[0].image_url, 'HALL_SMALL_BANNER') }} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {this.onPressItem(item.game_banner[1].link_url.split('/')[item.game_banner[1].link_url.split('/').length - 1], item.game_banner[0].title)}}>
                      <Image style={[styles.smallBanner, { backgroundColor: isNightMode ? '#000' : '#F4F5F6', overlayColor: isNightMode ? '#252525' : '#FFF' }]}
                        source={{ uri: getImgUrl(item.game_banner[1].image_url, 'HALL_SMALL_BANNER') }} />
                    </TouchableWithoutFeedback>         
                  </View>
                }
              </View> 
            </View>
          }
        </View>
    );
  }

  /**
   * 点击跳转游戏详情页
   * @param {String} gameId 游戏id
   * @param {String} gameName 游戏名
   */
  onPressItem(gameId, gameName) {
    const { navigate } = this.props.screenProps;
    navigate('CardDetail', { gameId, gameName });
  }

  /**
   * 点击下载游戏按钮
   * @param {String} downloadUrl 下载链接
   */
  onPressDownload(downloadUrl) {
    Linking.openURL(downloadUrl);
  }

  /**
   * 点击查看更多，进入游戏块
   * @param {string} gameBoxId 游戏块id
   * @param {string} gameBoxName 游戏块名称
   */
  onPressShowMore(gameBoxId, gameBoxName) {
    const { navigate } = this.props.screenProps;
    navigate('GameBox', { gameBoxId, gameBoxName });
  }

  /**
   * 拉取数据
   */
  fetchData() {
    let url = `${HALL}&platform=${platform}&game_box_ids=${JSON.stringify(this.gameBoxIds)}`;
    fetch(url).then(res => res.json()).then(res => {
      let data = res.data;
      data.game_box_lists.forEach(item => {
        this.gameBoxIds.push(item.game_box_id);
      });
      let newState = {
        hallData: [ ...this.state.hallData.slice(0, this.state.hallData.length - 1), ...data.game_box_lists, {} ],
      };
      if (data.top_banner_imgs) {
        newState.swiperArr = data.top_banner_imgs;
      }
      if (this.state.isLoading) {
        newState.isLoading = false;
      }
      newState.hasMore = res.has_more;
      this.setState(newState);
    })
    .catch(err => {
      console.log(err);
    });
  }
}

const mapStateToProps = (state) => {
  let { theme, mode } = state;
  return {
    theme,
    mode,
  };
}

export default connect(mapStateToProps)(Hall);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maskWrap: {
    width: totalWidth,
    height: totalHeight - 90 - STATUSBAR_HEIGHT,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperItem: {
    width: totalWidth,
    height: 140,
    // backgroundColor: '#F4F5F6',
  },
  ItemSeparator: {
    // backgroundColor: '#F4F5F6',
    width: totalWidth,
    height: 6,
  },
  gameBoxTitleWrap: {
    paddingHorizontal: 15 / 375 * totalWidth,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gameBoxTitle: {
    fontSize: 16,
    // color: '#222',
    paddingTop: 15,
  },
  gameList: {
    paddingHorizontal: 15 / 375 * totalWidth,
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gameItem: {
    marginTop: 15,
    width: 66 / 375 * totalWidth,
    marginRight: 27 / 375 * totalWidth,
  },
  gameIcon: {
    // backgroundColor: '#F4F5F6',
    width: 66 / 375 * totalWidth,
    height: 66,
    borderRadius: 12,
  },
  gameName: {
    marginTop: 8,
    fontSize: 14,
    // color: '#222',
    textAlign: 'center',
  },
  gameSize: {
    fontSize: 12,
    // color: '#999',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 8,
  },
  downloadWrap: {
    width: 66 / 375 * totalWidth,
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
  bannerWrap: {
    // borderColor: '#F4F5F6',
    borderStyle: 'solid',
    borderTopWidth: 6,
  },
  bigBanner: {
    width: totalWidth,
    height: 84,
    // backgroundColor: '#F4F5F6',
  },
  smallBannerWrap: {
    paddingHorizontal: 15 / 375 * totalWidth,
    paddingVertical: 10 / 375 * totalWidth,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  smallBanner: {
    width: 168 / 375 * totalWidth,
    height: 84,
    borderRadius: 4,
    // backgroundColor: '#F4F5F6',    
  },
});