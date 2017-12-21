import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  WebView,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';

const PixelRatio = require('PixelRatio');
const Dimensions = require('Dimensions');
const { width: totalWidth, height: totalHeight } = Dimensions.get('window');
const detailData = require("../conf/detailMock.json");

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
  }

  componentWillMount() {
    this.detailData = detailData;
  }
  
  render() {
    let { banner, content, desc, message, recommend } = this.detailData;
    return (
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
        <View style={styles.contentWrap}>
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
      </View>
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
    backgroundColor: '#FFF',
    borderBottomWidth: 6,
    borderColor: '#F4F5F6',
    borderStyle: 'solid',
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
    borderColor: '#E8E8E8',
    borderStyle: 'solid',
    borderRadius: 4,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export {
  ArticleDetail,
  CardDetail,
}

