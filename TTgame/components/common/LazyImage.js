import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

import { isAndroid, totalHeight } from '../../conf/deviceParam';
const REFRESH_CONTROL_HEIGHT = isAndroid ? 0 : 60; // 因为Flatlist加载的时候会出现菊花图，高度计算需要减去

export default class LazyImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isImgShow: false,
      opacity: new Animated.Value(0),
    };
    this.shouldUpdate = false;
    this.compareDis = this.compareDis.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    this.onPressImg = this.onPressImg.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.img.measure((x, y, width, height, pageX, pageY) => {
        this.scrollThreshold = this.props.contentOffsetY + pageY;
        if (!this.props.loadDirection) {
          this.scrollThreshold -= REFRESH_CONTROL_HEIGHT;
        }
        this.compareDis(this.props.contentOffsetY);
      });
    }, 0);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.isNightMode != nextProps.isNightMode ||
      this.props.imgUrl != nextProps.imgUrl) {
      return true;
    }
    return this.shouldUpdate;
  }
  
  componentWillReceiveProps(nextProps) {    
    if (this.props.netInfo == 'wifi' ||
      (this.props.netInfo == 'nowifi' && this.props.loadImgWithoutWifi)) {
      this.compareDis(nextProps.contentOffsetY);
    }
  }

  render() {
    let imgNotLoadInMobileNet = !this.state.isImgShow &&
      this.props.netInfo == 'nowifi' &&
      !this.props.loadImgWithoutWifi;
    let imgView = 
      <View
        ref={(img) => { this.img = img; }}
        style={[styles.container, { backgroundColor: this.props.isNightMode ? '#000' : '#F4F5F6' },
        this.props.marginRight && { marginRight: this.props.marginRight }]}>
        { 
          imgNotLoadInMobileNet &&
          <Text style={[styles.clickLoadTip,
            { color: this.props.isNightMode ? '#FFF' : '#000' }]}>
            点击加载图片
          </Text>
        }
        <Animated.View
          style={{
            opacity: this.state.opacity,
          }}>
          <Image
            onLoad={this.startAnimation}
            style={this.props.imgStyle}
            source={this.state.isImgShow ? { uri: this.props.imgUrl } : {}} />
        </Animated.View>
      </View>;

    return (
      <View>
        {
          imgNotLoadInMobileNet ?
            <TouchableWithoutFeedback onPress={this.onPressImg}>
              {imgView}
            </TouchableWithoutFeedback> :
            <View>
              {imgView}
            </View>
        }
      </View>
    );
  }

  /**
   * 点击图片 
   */
  onPressImg() {
    if (!this.state.isImgShow &&
      this.props.netInfo == 'nowifi' &&
      !this.props.loadImgWithoutWifi) {
      this.setState({
        isImgShow: true,
      });
      this.shouldUpdate = true;
    }
  }

  /**
   * opacity加载的动画
   */
  startAnimation() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
    this.shouldUpdate = false;    
  }

  /**
   * 比较图片距离screen顶部距离和滚动距离，判断图片是否应该显示
   * @param {number} contentOffsetY 当前列表滚动的距离
   */
  compareDis(contentOffsetY) {
    if (!this.state.isImgShow && contentOffsetY + totalHeight > this.scrollThreshold) {
      this.shouldUpdate = true;
      this.setState({
        isImgShow: true,
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clickLoadTip: {
    position: 'absolute',
    fontSize: 18,
  },
});