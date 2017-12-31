import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

import Swiper from 'react-native-swiper';
import { MyStatusBar, STATUSBAR_HEIGHT } from '../../common/MyStatusBar';
import BottomLoading from '../../common/BottomLoading';
import { HALL } from '../../../conf/api';
import { getImgUrl } from '../../../utils/util';  

const { width: totalWidth, height: totalHeight } = Dimensions.get('window');
const platform = Platform.OS === 'ios' ? '1' : '0';

export default class Hall extends Component {

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
  }
  
  componentWillMount() {
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
          <View style={[styles.container, {backgroundColor: '#FFF'}]}>
            <FlatList
              data={this.state.hallData}
              keyExtractor={(item, index) => index}
              ItemSeparatorComponent={() => <View style={styles.ItemSeparator} />}
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
    if (this.state.hallData.length == 1) {
      return null;
    }
    return (
      index == this.state.hallData.length - 1 ? 
        this.state.hasMore ? <BottomLoading /> : null :
        <View>
          { index == 0 &&
            <Swiper autoplay={true} loadMinimal={false} height={140}>
              {
                this.state.swiperArr.map((item, index) => {
                  return (
                    <Image key={index} source={{ uri: getImgUrl(item.image_url, 'HALL_SWIPER') }}
                      style={styles.swiperItem} />
                  );
                })
              }
            </Swiper>
          }
          <View>
            <Text style={styles.gameBoxTitle}>{item.title}</Text>
            <View style={styles.gameList}>
              {
                item.game_lists.map((game, gameIndex) => {
                  return (
                    <View key={gameIndex} style={[styles.gameItem, (gameIndex + 1) % 4 == 0 && { marginRight: 0 }]}>
                      <Image style={styles.gameIcon} source={{ uri: getImgUrl(game.avatar, 'HALL_ICON') }}/>
                      <Text numberOfLines={1} style={styles.gameName}>{ game.name }</Text>
                      <Text numberOfLines={1} style={styles.gameSize}>{ game.size }</Text>
                      <View style={styles.downloadWrap}>
                        <Text style={styles.download}>下载</Text>
                      </View>
                    </View>
                  );
                })
              }
            </View>
            <View style={styles.bannerWrap}>
              {
                item.game_banner.length == 1 ?
                <Image style={styles.bigBanner}
                  source={{ uri: getImgUrl(item.game_banner[0].image_url, 'HALL_BIG_BANNER') }} /> :
                <View style={styles.smallBannerWrap}>
                  <Image style={styles.smallBanner}
                    source={{ uri: getImgUrl(item.game_banner[0].image_url, 'HALL_SMALL_BANNER') }} />
                  <Image style={styles.smallBanner} 
                    source={{ uri: getImgUrl(item.game_banner[1].image_url, 'HALL_SMALL_BANNER') }} />              
                </View>
              }
            </View>
          </View>
        </View>
    );
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
    backgroundColor: '#F4F5F6',
  },
  ItemSeparator: {
    backgroundColor: '#F4F5F6',
    width: totalWidth,
    height: 6,
  },
  gameBoxTitle: {
    fontSize: 16,
    color: '#222',
    paddingLeft: 15,
    paddingTop: 15,
  },
  gameList: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gameItem: {
    marginTop: 15,
    width: 66,
    marginRight: 27,
  },
  gameIcon: {
    backgroundColor: '#FFF',
    width: 66,
    height: 66,
    borderRadius: 12,
  },
  gameName: {
    marginTop: 8,
    fontSize: 14,
    color: '#222',
    textAlign: 'center',
  },
  gameSize: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 8,
  },
  downloadWrap: {
    width: 66,
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
  bannerWrap: {
    borderColor: '#F4F5F6',
    borderStyle: 'solid',
    borderTopWidth: 6,
  },
  bigBanner: {
    width: totalWidth,
    height: 84,
    backgroundColor: '#F4F5F6',
  },
  smallBannerWrap: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  smallBanner: {
    width: 168,
    height: 84,
    borderRadius: 4,
    backgroundColor: '#F4F5F6',    
  },
});