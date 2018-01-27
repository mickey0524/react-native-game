import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import LazyImage from '../../../common/LazyImage';
import { totalWidth } from '../../../../conf/deviceParam';

class ArticleOneImgCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: '',
      updateTime: '',
    }
    this.changePropFormat = this.changePropFormat.bind(this);
  }
  
  componentWillMount() {
    this.changePropFormat();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.mode != nextProps.mode ||
      this.props.imgUrl != nextProps.imgUrl ||
      this.props.contentOffsetY != nextProps.contentOffsetY) {
      return true;
    }
    return false;
  }

  componentWillReceiveProps() {
    this.changePropFormat();
  }
  
  render() {
    let isNightMode = this.props.mode == 'night';
    return (
      <View style={{padding: 15}}>
        <View style={styles.oneImgWrap}>
          <Text style={[styles.oneTitle, { color: this.props.articleInfo.isBrowered ? '#999' : isNightMode ? '#FFF' : '#222' }]}>{this.props.articleInfo.title}</Text>
          <LazyImage
            isNightMode={isNightMode}
            netInfo={this.props.netInfo}
            loadImgWithoutWifi={this.props.loadImgWithoutWifi}   
            contentOffsetY={this.props.contentOffsetY}          
            loadDirection={this.props.loadDirection}
            imgStyle={styles.oneImg}
            imgUrl={this.state.imgUrl } />
        </View>
        <View style={styles.articleInfo}>
          <Text style={[styles.articleInfoText, { color: this.props.articleInfo.isBrowered ? '#999' : isNightMode ? '#FFF' : '#999' }]}>{this.props.articleInfo.source}</Text>
          <Text style={[styles.articleInfoText, { color: this.props.articleInfo.isBrowered ? '#999' : isNightMode ? '#FFF' : '#999' }]}>{this.props.articleInfo.comment_num}评论</Text>
          <Text style={[styles.articleInfoText, { color: this.props.articleInfo.isBrowered ? '#999' : isNightMode ? '#FFF' : '#999' }]}>{this.state.updateTime}</Text>
        </View>
      </View>
    );
  }

  /**
   * 改变props中的数据格式
   */
  changePropFormat() {
    let updateTime = /(.*):/gi.exec(this.props.articleInfo.update_time)[1],
      imgUrl = this.props.articleInfo.image_list[0];
    imgUrl = imgUrl.replace('http', 'https');
    imgUrl = imgUrl.replace('origin', 'list');
    this.setState({
      imgUrl,
      updateTime,
    });
  }
}

class ArticleThreeImgCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateTime: '',
      imgList: [],
    }
    this.changePropFormat = this.changePropFormat.bind(this);
  }

  componentWillMount() {
    this.changePropFormat();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.mode != nextProps.mode ||
      this.props.contentOffsetY != nextProps.contentOffsetY ||
      this.props.articleInfo.isBrowered !== nextProps.isBrowered ||
      this.props.articleInfo.image_list[0] !== nextProps.articleInfo.image_list[0]) {
      return true;
    }
    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.changePropFormat(); 
  }

  render() {
    let isNightMode = this.props.mode == 'night';
    return (
      <View style={{ padding: 15 }}>
        <Text style={[styles.threeTitle, { color: this.props.articleInfo.isBrowered ? '#999' : isNightMode ? '#FFF' : '#222' } ]}>
          {this.props.articleInfo.title}
        </Text>
        <View style={styles.threeImgWrap}>
          {
            this.state.imgList.map((img, index) => {
              return (
                index <= 2 &&
                  <LazyImage
                    key={index}
                    isNightMode={isNightMode}
                    netInfo={this.props.netInfo}
                    loadImgWithoutWifi={this.props.loadImgWithoutWifi}
                    contentOffsetY={this.props.contentOffsetY}
                    loadDirection={this.props.loadDirection}
                    marginRight={index == 2 ? 0 : 3}
                    imgStyle={styles.threeImg}
                    imgUrl={img} />
              );
            })
          }
        </View>
        <View style={styles.articleInfo}>
          <Text style={[styles.articleInfoText, { color: this.props.articleInfo.isBrowered ? '#999' : isNightMode ? '#FFF' : '#999' }]}>{this.props.articleInfo.source}</Text>
          <Text style={[styles.articleInfoText, { color: this.props.articleInfo.isBrowered ? '#999' : isNightMode ? '#FFF' : '#999' }]}>{this.props.articleInfo.comment_num}评论</Text>
          <Text style={[styles.articleInfoText, { color: this.props.articleInfo.isBrowered ? '#999' : isNightMode ? '#FFF' : '#999' }]}>{this.state.updateTime}</Text>
        </View>
      </View>
    )
  }

  /**
   * 改变props中的数据格式
   */
  changePropFormat() {
    let updateTime = /(.*):/gi.exec(this.props.articleInfo.update_time)[1];
    let imgList = this.props.articleInfo.image_list;
    if (imgList.length > 3) {
      imgList = imgList.slice(0, 3);
    }
    imgList = this.props.articleInfo.image_list.map(img => {
      img = img.replace('http', 'https');
      img = img.replace('origin', 'list');
      return img;
    });
    this.setState({
      imgList,
      updateTime,
    });
  }
}

const styles = StyleSheet.create({
  threeTitle: {
    fontSize: 19,
    // color: '#222222',
    marginBottom: 10,
  },
  threeImgWrap: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 8,
  },
  threeImg: {
    width: 113,
    height: 74,
    // marginRight: 3,
    // backgroundColor: '#F4F5F6',
  },

  oneImgWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  oneTitle: {
    fontSize: 19,
    // color: '#222222',
    width: 210,
    marginRight: 20,
  },
  oneImg: {
    width: 113,
    height: 74,
    // backgroundColor: '#F4F5F6',
  },

  articleInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleInfoText: {
    // color: '#999',
    fontSize: 12,
    marginRight: 6,
  }
});

export {
  ArticleOneImgCell,
  ArticleThreeImgCell,
}