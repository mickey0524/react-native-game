import React, { Component } from 'react';
import {
  View,
  Image,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';

const totalHeight = Dimensions.get('window').height;
const REFRESH_CONTROL_HEIGHT = 60; // 因为Flatlist加载的时候会出现菊花图，高度计算需要减去

export default class LazyImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isImgShow: false,
      opacity: new Animated.Value(0),
    };
    this.compareDis = this.compareDis.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
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

  componentWillReceiveProps(nextProps) {
    this.compareDis(nextProps.contentOffsetY);
  }

  render() {
    return (
      <View style={{backgroundColor: this.props.isNightMode ? '#000' : '#F4F5F6'}}>
        <Animated.View
          style={{
            opacity: this.state.opacity,
          }}>
          <Image
            onLoad={this.startAnimation}
            style={this.props.imgStyle}
            source={this.state.isImgShow ? { uri: this.props.imgUrl } : {}}
            ref={(img) => {this.img = img;}} />
        </Animated.View>
      </View>
    );
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