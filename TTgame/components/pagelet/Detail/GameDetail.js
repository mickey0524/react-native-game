import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import {
  View,
  Text,
  StyleSheet,
  WebView,
  Image,
  ImageBackground,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Modal,
  Linking,
  ActionSheetIOS,
  TouchableWithoutFeedback,
} from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';
import ActionSheet from 'react-native-actionsheet';
import Share from 'react-native-share';

import { totalWidth, totalHeight, dpr, isAndroid } from '../../../conf/deviceParam';
import { MyStatusBar, STATUSBAR_HEIGHT } from '../../common/MyStatusBar';
import ToolBar from '../../common/ToolBar';
import { getImgUrl } from '../../../utils/util';

const detailData = require("../../../conf/detailMock.json");
const SHRINK_BASE = 45;
const URL_PREFIX = 'https://ic.snssdk.com/game_channel/detail/',
  CANCEL_INDEX = 2,
  OPTIONS = ['在浏览器中打开', '分享', '取消'];

class CardDetail extends Component {
  constructor(props) {
    super(props);
    this.gameName = this.props.navigation.state.params.gameName;
    this.gameId = this.props.navigation.state.params.gameId;
    this.state = {
      isImgViewerShow: false,
      isDescShrink: true,
      isLoading: true,
      imgViewerIndex: 0,
    }
    this.showText = this.showText.bind(this);
    this.renderRecItem = this.renderRecItem.bind(this);
    this.onPressContentImg = this.onPressContentImg.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.onPressToolBarMore = this.onPressToolBarMore.bind(this);
  }

  componentWillMount() {
    let { banner, content, desc, message, recommend } = JSON.parse(JSON.stringify(detailData));
    banner.background = getImgUrl(banner.background, 'DETAIL_BANNER_BACKGROUND');
    banner.icon = getImgUrl(banner.icon, 'DETAIL_BANNER_ICON');
    content.thumbnail = content.thumbnail.map(imgUrl => getImgUrl(imgUrl, 'DETAIL_CONTENT_IMG'));
    recommend = recommend.map(game => {
      game.icon = getImgUrl(game.icon, 'DETAIL_RECO_ICON');
      return game;
    });
    this.detailData = { banner, content, desc, message, recommend };
  }

  componentDidMount() {
    setTimeout(() => { // 模拟数据加载过程
      this.setState({
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    let isNightMode = this.props.mode == 'night';
    let { banner, content, desc, message, recommend } = this.detailData;
    let imageViewerArr = [];
    content.thumbnail.forEach(url => {
      imageViewerArr.push({
        url,
      });
    });
    let engNum = 0;
    for (let num of desc.slice(0, SHRINK_BASE)) {
      if (/^[a-zA-Z]$/gi.test(num)) {
        engNum += 1;
      }
    }
    let engToCh = engNum - Math.ceil(engNum / 3 * 2); // 3个英文字母宽度约等于2个汉字的宽度
    let tail = SHRINK_BASE + engToCh;
    desc = { spread: desc, shrink: desc.slice(0, tail) + '...' };
    return (
      <View style={styles.container}>
        {
          isAndroid &&
          <ActionSheet
            ref={o => this.ActionSheet = o}
            options={OPTIONS}
            cancelButtonIndex={CANCEL_INDEX}
            onPress={this.handlePress} />
        }
        <MyStatusBar />
        <ToolBar
          title={this.gameName}
          navigation={this.props.navigation}
          onPressToolBarMore={this.onPressToolBarMore}
          leftIcon={'back'}
          rightIcon={['more']} />
        <ScrollView style={{ backgroundColor: this.props.theme.themeColor }}>
          <View style={{ backgroundColor: isNightMode ? '#252525' : '#FFF' }}>
            {
              this.state.isLoading &&
              <View style={styles.maskWrap}>
                <ActivityIndicator />
              </View>
            }
            {
              !this.state.isLoading &&
              <View>
                <ImageBackground style={styles.imageBackground} source={{ uri: banner.background }}>
                  <View style={styles.bannerWrap}>
                    <Image style={[styles.bannerIcon, { backgroundColor: isNightMode ? '#000' : '#F4F5F6', overlayColor: isNightMode ? '#252525' : '#FFF' }]} source={{ uri: banner.icon }} />
                    <View style={styles.bannerInfo}>
                      <Text numberOfLines={1} style={styles.gameName}>{banner.name}</Text>
                      <Text numberOfLines={1} style={styles.gameInfo}>大小: {banner.size}M</Text>
                      <Text numberOfLines={1} style={styles.gameInfo}>{banner.title}</Text>
                    </View>
                    <View style={[styles.downloadWrap, {backgroundColor: this.props.theme.focusColor}]}>
                      <Text style={styles.download}>下载</Text>
                    </View>
                  </View>
                </ImageBackground>

                <View style={[styles.contentWrap, styles.viewBottomBorder, { borderColor: isNightMode ? '#424242' : '#F4F5F6'}]}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    ItemSeparatorComponent={() => <View style={{ width: 3 }} />}
                    // getItemLayout={(data, index) => ({ length: 135, offset: 138 * index, index })}
                    initialNumToRender={3}
                    data={content.thumbnail}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) =>
                      <TouchableWithoutFeedback onPress={() => this.onPressContentImg(index)}>
                        <Image source={{ uri: item }}
                          style={[styles.contentImg, index == 0 && { marginLeft: 15 }, { backgroundColor: isNightMode ? '#000' : '#F4F5F6' }]} />
                      </TouchableWithoutFeedback>
                  } />
                  <View style={styles.contentCategory}>
                    {
                      content.category.map((item, index) => {
                        return (
                          <View key={index} style={[styles.contentCategoryItem, { backgroundColor: isNightMode ? '#424242' : '#F4F5F6'}]}>
                            <Text style={{ color: isNightMode ? '#FFF' : '#000' }}>{item}</Text>
                          </View>
                        );
                      })
                    }
                  </View>
                </View>

                <View style={[styles.viewBottomBorder, { borderColor: isNightMode ? '#424242' : '#F4F5F6'}]}>
                  <View style={[styles.descTitle, { borderColor: isNightMode ? '#424242' : '#E8E8E8' }]}>
                    <Text style={[styles.descTitleText, { color: isNightMode ? '#FFF' : '#222' }]}>应用描述</Text>
                  </View>
                  {this.state.isDescShrink ?
                    <Text style={[styles.descContent, { color: isNightMode ? '#FFF' : '#999' }]}>{desc.shrink}<Text style={{color: this.props.theme.focusColor}} onPress={this.showText}> 更多</Text></Text> :
                    <Text style={[styles.descContent, { color: isNightMode ? '#FFF' : '#999' }]}>{desc.spread}<Text style={{color: this.props.theme.focusColor}} onPress={this.showText}> 收起</Text></Text>
                  }
                </View>

                <View style={[styles.viewBottomBorder, { borderColor: isNightMode ? '#424242' : '#F4F5F6'}]}>
                  <View style={[styles.descTitle, { borderColor: isNightMode ? '#424242' : '#E8E8E8' }]}>
                    <Text style={[styles.descTitleText, { color: isNightMode ? '#FFF' : '#222' }]}>其他信息</Text>
                  </View>
                  <Text style={[styles.descContent, { color: isNightMode ? '#FFF' : '#999' }]}>
                    <Text>当前版本：{message.version}</Text>
                    <Text>{'\r\n'}更新信息：{message.modifyTime}</Text>
                    <Text>{'\r\n'}客服信息：{message.phone}</Text>
                  </Text>
                </View>

                <View style={[styles.viewBottomBorder, { borderColor: isNightMode ? '#424242' : '#F4F5F6'}]}>
                  <View style={[styles.descTitle, { marginBottom: 0, borderColor: isNightMode ? '#424242' : '#E8E8E8' }]}>
                    <Text style={[styles.descTitleText, { color: isNightMode ? '#FFF' : '#222' }]}>游戏推荐</Text>
                  </View>
                  <FlatList
                    style={{ paddingVertical: 20 }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                    ListHeaderComponent={() => <View style={{ width: 10 }} />}
                    ListFooterComponent={() => <View style={{ width: 10 }} />}
                    // getItemLayout={(data, index) => ({ length: 70, offset: 85 * index, index })}
                    initialNumToRender={5}
                    data={recommend}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderRecItem} />
                </View>
              </View>
            }
          </View>
        </ScrollView>
        <Modal
          onRequestClose={() => {}}
          visible={this.state.isImgViewerShow}
          transparent={true}>
          <ImageViewer 
            index={this.state.imgViewerIndex}
            imageUrls={imageViewerArr} 
            onClick={() => { this.setState({ isImgViewerShow: false }) }}
            saveToLocalByLongPress={false}/>
        </Modal>
      </View>
    );
  }

  /**
   * 点击ActionSheet的回调函数
   * @param {Number} index button的索引 
   */
  handlePress(index) {
    if (index == 0) {
      Linking.openURL(`${URL_PREFIX}${this.gameId}`);
    } else if (index == 1) {
      let shareOptions = {
        url: `${URL_PREFIX}${this.gameId}`,
        message: this.gameName,
        subject: this.gameName,
      };
      Share.open(shareOptions).catch((err) => { err && console.log(err); });
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
   * 点击content里的图片，打开imgViewer
   */
  onPressContentImg(index) {
    this.setState({
      imgViewerIndex: index,
      isImgViewerShow: true,
    });
  }

  /**
   * 点击更多或者收起
   */
  showText() {
    let isDeskShrink = this.state.isDescShrink;
    this.setState({
      isDescShrink: !isDeskShrink,
    });
  }

  /**
   * 渲染推荐的item  
   */
  renderRecItem({ item }) {
    let isNightMode = this.props.mode == 'night';
    return (
      <View style={styles.recItem}>
        <Image source={{ uri: item.icon }} style={[styles.recIcon, { backgroundColor: isNightMode ? '#000' : '#F4F5F6', overlayColor: isNightMode ? '#252525' : '#FFF' }]} />
        <Text numberOfLines={1} style={[styles.recName, { color: isNightMode ? '#FFF' : '#000' }]}>{item.name}</Text>
        <Text numberOfLines={1} style={[styles.recSize, { color: isNightMode ? '#FFF' : '#999' }]}>大小：{item.size}M</Text>
        <View style={[styles.downloadWrap, {backgroundColor: this.props.theme.focusColor}]}>
          <Text style={styles.download}>下载</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let { theme, mode } = state;
  return {
    theme,
    mode,
  }
}

export default connect(mapStateToProps)(CardDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewBottomBorder: {
    borderBottomWidth: 6,
    // borderColor: '#F4F5F6',
    borderStyle: 'solid',
  },

  maskWrap: {
    width: totalWidth,
    height: totalHeight - 50 - STATUSBAR_HEIGHT,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageBackground: {
    width: totalWidth,
    height: 255,
  },
  bannerWrap: {
    position: 'absolute',
    bottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  bannerIcon: {
    width: 70 / 375 * totalWidth,
    height: 70 / 375 * totalWidth,
    borderRadius: 13,
    marginRight: 15 / 375 * totalWidth,
  },
  bannerInfo: {
    marginRight: 15 / 375 * totalWidth,
    width: 185 / 375 * totalWidth,
    backgroundColor: 'transparent',
  },
  gameName: {
    fontSize: 18,
    color: '#222',
  },
  gameInfo: {
    fontSize: 12,
    color: '#3F3F3F',
    marginTop: 5,
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

  contentWrap: {
    marginTop: 2,
  },
  contentImg: {
    width: 135,
    height: 240,
    // backgroundColor: '#F4F5F6',
  },
  contentCategory: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row'
  },
  contentCategoryItem: {
    marginRight: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    // backgroundColor: '#F4F5F6',
    borderWidth: 1 / dpr,
    borderStyle: 'solid',
    borderColor: '#E8E8E8',
    borderRadius: 4,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  descTitle: {
    paddingLeft: 15,
    paddingVertical: 9,
    marginBottom: 15,
    borderBottomWidth: 1 / dpr,
    borderStyle: 'solid',
    // borderColor: '#E8E8E8',
  },
  descTitleText: {
    fontSize: 14,
    // color: '#222',
  },
  descContent: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    fontSize: 14,
    // color: '#999',
    lineHeight: 20,
  },

  recItem: {
    width: 70,
    display: 'flex',
    alignItems: 'center',
  },
  recIcon: {
    width: 59,
    height: 59,
    borderRadius: 13,
    marginBottom: 11,
    // backgroundColor: '#F4F5F6',
  },
  recName: {
    fontSize: 14,
    // color: '#222',
    marginBottom: 5,
  },
  recSize: {
    fontSize: 12,
    // color: '#999',
    marginBottom: 10,
  },
});

