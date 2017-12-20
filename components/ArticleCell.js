import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

const Dimensions = require('Dimensions');
let totalWidth = Dimensions.get('window').width;

class ArticleOneImgCell extends Component {
  constructor(props) {
    super(props)
  }
  
  componentWillMount() {
    this.updateTime = /(.*):/gi.exec(this.props.articleInfo.update_time)[1];
    let imgUrl = this.props.articleInfo.image_list[0];
    imgUrl = imgUrl.replace('http', 'https');
    imgUrl = imgUrl.replace('origin', 'list');
    this.imgUrl = imgUrl;
  }
  
  render() {
    return (
      <View style={{padding: 15}}>
        <View style={styles.oneImgWrap}>
          <Text style={styles.oneTitle}>{this.props.articleInfo.title}</Text>
          <Image style={styles.oneImg} source={{ uri: this.imgUrl }}/>
        </View>
        <View style={styles.articleInfo}>
          <Text style={styles.articleInfoText}>{this.props.articleInfo.source}</Text>
          <Text style={styles.articleInfoText}>{this.props.articleInfo.comment_num}评论</Text>
          <Text style={styles.articleInfoText}>{this.updateTime}</Text>
        </View>
      </View>
    );
  }
}

class ArticleThreeImgCell extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.updateTime = /(.*):/gi.exec(this.props.articleInfo.update_time)[1];
    let imgList = this.props.articleInfo.image_list;
    if (imgList.length > 3) {
      imgList = imgList.slice(0, 3);
    }
    imgList = this.props.articleInfo.image_list.map(img => {
      img = img.replace('http', 'https');
      img = img.replace('origin', 'list');
      return img;
    });
    this.imgList = imgList;
  }
  
  render() {
    return (
      <View style={{ padding: 15 }}>
        <Text style={styles.threeTitle}>{this.props.articleInfo.title}</Text>
        <View style={styles.threeImgWrap}>
          {
            this.imgList.map((img, index) => {
              return (
                index <= 2 && <Image key={index} style={[styles.threeImg, index == 2 && { marginRight: 0 }]} source={{ uri: img }}/>
              );
            })
          }
        </View>
        <View style={styles.articleInfo}>
          <Text style={styles.articleInfoText}>{this.props.articleInfo.source}</Text>
          <Text style={styles.articleInfoText}>{this.props.articleInfo.comment_num}评论</Text>
          <Text style={styles.articleInfoText}>{this.updateTime}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  threeTitle: {
    fontSize: 19,
    color: '#222222',
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
    marginRight: 3,
    backgroundColor: '#F4F5F6',
  },

  oneImgWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  oneTitle: {
    fontSize: 19,
    color: '#222222',
    width: 210,
    marginRight: 20,
  },
  oneImg: {
    width: 113,
    height: 74,
    backgroundColor: '#F4F5F6',    
  },

  articleInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleInfoText: {
    color: '#999',
    fontSize: 12,
    marginRight: 6,
  }
});

export {
  ArticleOneImgCell,
  ArticleThreeImgCell,
}