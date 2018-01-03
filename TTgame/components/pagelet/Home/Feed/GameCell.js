import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { getImgUrl } from '../../../../utils/util';

const totalHeight = Dimensions.get('window').height;
const REFRESH_CONTROL_HEIGHT = 60; // 因为Flatlist加载的时候会出现菊花图，高度计算需要减去

class GameCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isImgShow: false,
    };
    this.compareDis = this.compareDis.bind(this);
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.img.measure((x, y, width, height, pageX, pageY) => {
        this.scrollThreshold = this.props.contentOffsetY + pageY - REFRESH_CONTROL_HEIGHT;
        this.compareDis(this.props.contentOffsetY);
      }); 
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    this.compareDis(nextProps.contentOffsetY);
  }

  render() {
    let imgUrl = getImgUrl(this.props.gameInfo.image_list[0], 'FEED_CARD');
    return (
      <View style={styles.gameWrap}>
        <Text style={styles.gameTitle}>
          { this.props.gameInfo.title }
        </Text>
        <Image style={styles.gameImg}
          ref={(img) => { this.img = img; }}
          source={this.state.isImgShow ? { uri: imgUrl } : {}} />
        <View style={styles.gameInfo}>
          <Text style={styles.gameName}>{ this.props.gameInfo.name }</Text>
          <View style={styles.download}>
            <Image source={require('../../../../assets/download.png')} style={styles.downloadIcon} />
            <Text style={styles.downloadText}>APP下载</Text>
          </View>
        </View>
      </View>
    );
  }

  /**
   * 比较图片距离screen顶部距离和滚动距离，判断图片是否应该显示
   * @param {number} contentOffsetY 当前列表滚动的距离
   */
  compareDis(contentOffsetY) {
    if (!this.state.isImgShow && contentOffsetY + totalHeight > this.scrollThreshold) {
      this.setState({
        isImgShow: true,
      });
    }
  }

}

const styles = StyleSheet.create({
  gameWrap: {
    padding: 15,
  },
  gameTitle: {
    color: '#222',
    fontSize: 19,
    marginBottom: 8,
  },
  gameImg: {
    width: 345,
    height: 194,
    marginBottom: 10,
    backgroundColor: '#F4F5F6',
  },
  gameInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameName: {
    fontSize: 12,
    color: '#999999',
    marginRight: 5,
  },
  download: {
    width: 60,
    height: 14,
    backgroundColor: '#2A90D7',
    borderRadius: 3,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  downloadText: {
    fontSize: 10,
    color: '#FFF',
    textAlign: 'center',
  },
  downloadIcon: {
    width: 8,
    height: 8,
  },
});

export {
  GameCell,
}