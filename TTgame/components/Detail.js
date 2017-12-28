import React, { Component } from 'react';
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
  Dimensions,
  PixelRatio,
} from 'react-native';

import { MyStatusBar, STATUSBAR_HEIGHT } from '../components/MyStatusBar';
import ToolBar from '../components/ToolBar';
import { getImgUrl } from '../utils/util';
import { SKY_BLUE } from '../conf/color';

const detailData = require("../conf/detailMock.json");

const dpr = PixelRatio.get();
const { width: totalWidth, height: totalHeight } = Dimensions.get('window');
const SHRINK_BASE = 45;

class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.source = this.props.navigation.state.params.source;
    this.articleName = this.props.navigation.state.params.articleName;
  }

  render() {
    return (
      <View style={styles.container}>
        <MyStaturBar backgroundColor={SKY_BLUE} barStyle={'light-content'} />
        <ToolBar title={this.articleName} navigation={this.props.navigation} isLeftIconShow={true} />
        <WebView
          scalesPageToFit={true}
          source={{ uri: this.source }}
          startInLoadingState={true} />
      </View>
    );
  }
}

class CardDetail extends Component {
  constructor(props) {
    super(props);
    this.gameName = this.props.navigation.state.params.gameName;
    this.state = {
      isDescShrink: true,
      isLoading: true,
    }
    this.showText = this.showText.bind(this);
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
    let { banner, content, desc, message, recommend } = this.detailData;
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
        <MyStatusBar backgroundColor={SKY_BLUE} barStyle={'light-content'} />
        <ToolBar title={this.gameName} navigation={this.props.navigation} isLeftIconShow={true} />
        <ScrollView style={{backgroundColor: SKY_BLUE}}>
          <View style={{backgroundColor: '#FFF'}}>
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
                      <Image style={styles.bannerIcon} source={{ uri: banner.icon }} />
                      <View style={styles.bannerInfo}>
                        <Text numberOfLines={1} style={styles.gameName}>{banner.name}</Text>
                        <Text numberOfLines={1} style={styles.gameInfo}>大小: {banner.size}M</Text>
                        <Text numberOfLines={1} style={styles.gameInfo}>{banner.title}</Text>
                      </View>
                      <View style={styles.downloadWrap}>
                        <Text style={styles.download}>下载</Text>
                      </View>
                    </View>
                  </ImageBackground>

                  <View style={[styles.contentWrap, styles.viewBottomBorder]}>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      ItemSeparatorComponent={() => <View style={{ width: 3 }} />}
                      getItemLayout={(data, index) => ({ length: 135, offset: 138 * index, index})}
                      initialNumToRender={Math.ceil(totalWidth / 138)}
                      data={content.thumbnail}
                      keyExtractor={(item, index) => index}
                      renderItem={({ item, index }) => <Image source={{ uri: item }} style={[styles.contentImg, index == 0 && { marginLeft: 15}]}/>} />
                    <View style={styles.contentCategory}>
                      {
                        content.category.map((item, index) => {
                          return (
                            <View key={index} style={styles.contentCategoryItem}>
                              <Text>{item}</Text>
                            </View>
                          );
                        })
                      }
                    </View>
                  </View>

                  <View style={styles.viewBottomBorder}>
                    <View style={styles.descTitle}>
                      <Text style={styles.descTitleText}>应用描述</Text>
                    </View>
                    { this.state.isDescShrink ? 
                      <Text style={styles.descContent}>{desc.shrink}<Text style={styles.showText} onPress={this.showText}> 更多</Text></Text> :
                      <Text style={styles.descContent}>{desc.spread}<Text style={styles.showText} onPress={this.showText}> 收起</Text></Text>
                    }
                  </View>

                  <View style={styles.viewBottomBorder}>
                    <View style={styles.descTitle}>  
                      <Text style={styles.descTitleText}>其他信息</Text>
                    </View>
                    <Text style={styles.descContent}>
                      <Text>当前版本：{message.version}</Text>
                      <Text>{'\r\n'}更新信息：{message.modifyTime}</Text>
                      <Text>{'\r\n'}客服信息：{message.phone}</Text>
                    </Text>
                  </View>
            
                  <View style={styles.viewBottomBorder}>
                    <View style={[styles.descTitle, { marginBottom: 0}]}>
                      <Text style={styles.descTitleText}>游戏推荐</Text>
                    </View>
                    <FlatList
                      style={{ paddingVertical: 20 }}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                      ListHeaderComponent={() => <View style={{ width: 10 }} />}
                      ListFooterComponent={() => <View style={{ width: 10 }} />}
                      getItemLayout={(data, index) => ({ length: 70, offset: 85 * index, index })}
                      initialNumToRender={5}
                      data={recommend}
                      keyExtractor={(item, index) => index}
                      renderItem={this.renderRecItem} />
                  </View>
                </View>
            }
          </View>
        </ScrollView>
      </View>
    );
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
    return (
      <View style={styles.recItem}>
        <Image source={{ uri: item.icon }} style={styles.recIcon} />
        <Text numberOfLines={1} style={styles.recName}>{item.name}</Text>
        <Text numberOfLines={1} style={styles.recSize}>大小：{item.size}M</Text>
        <View style={styles.downloadWrap}>
          <Text style={styles.download}>下载</Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    width: totalWidth,
    height: totalHeight,
  },
  viewBottomBorder: {
    borderBottomWidth: 6,
    borderColor: '#F4F5F6',
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
    width: 70,
    height: 70,
    borderRadius: 13,
    marginRight: 15,
  },
  bannerInfo: {
    marginRight: 15,
    width: 185,
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

  contentWrap: {
    marginTop: 2,
  },
  contentImg: {
    width: 135,
    height: 240,
    backgroundColor: '#F4F5F6',
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
    backgroundColor: '#F4F5F6',
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
    borderColor: '#E8E8E8',
  },
  descTitleText: {
    fontSize: 14,
    color: '#222',
  },
  descContent: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
  },
  showText: {
    color: '#406599',
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
    backgroundColor: '#F4F5F6',
  },
  recName: {
    fontSize: 14,
    color: '#222',
    marginBottom: 5,
  },
  recSize: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
});

export {
  ArticleDetail,
  CardDetail,
}

