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
} from 'react-native';

const PixelRatio = require('PixelRatio').get();
const Dimensions = require('Dimensions');
const { width: totalWidth, height: totalHeight } = Dimensions.get('window');
const detailData = require("../conf/detailMock.json");
const SHRINK_BASE = 45;

class ArticleDetail extends Component {

  static navigationOptions = {
    title: '游戏文章',
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.source = this.props.navigation.state.params.source;
  }
  
  render() {
    return (
      <WebView
        style={styles.webview} 
        source={{ uri: this.source }}
        startInLoadingState={true} />
    );
  }
}

class CardDetail extends Component {
  static navigationOptions = {
    title: '游戏卡片',
  };

  constructor(props) {
    super(props)
    this.state = {
      isDescShrink: true,
    }
    this.showText = this.showText.bind(this);
  }

  componentWillMount() {
    this.detailData = detailData;
  }

  showText() {
    let isDeskShrink = this.state.isDescShrink;
    this.setState({
      isDescShrink: !isDeskShrink,
    });
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
      <ScrollView style={{backgroundColor: '#FFF'}}>
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
      </ScrollView>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderWidth: 1 / PixelRatio,
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
    borderBottomWidth: 1 / PixelRatio,
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
});

export {
  ArticleDetail,
  CardDetail,
}

