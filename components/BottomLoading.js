import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotateValue: new Animated.Value(0),
    };
    this.startAnimation = this.startAnimation.bind(this);
  }

  componentDidMount() {
    this.startAnimation();
  }

  componentWillUnmount() {
    this.state.rotateValue.stopAnimation();    
  }

  render() {
    return (
      <View style={styles.bottomLoading}>
        <Text style={styles.bottomLoadingText}>正在努力加载</Text>
        <Animated.Image
          style={[styles.bottomLoadingImg, {
            transform: [{
              rotate: this.state.rotateValue
                .interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] })
            }]
          }]}
          source={require('../assets/rotate-load.png')} />
      </View>
    );
  }
  
  /**
   * 循环显示Loading动画
   */
  startAnimation() {
    this.state.rotateValue.setValue(0);
    Animated.timing(this.state.rotateValue, {
      toValue: 360,
      duration: 600,
      easing: Easing.linear,
    }).start(() => { this.props.isRotate && this.startAnimation() });
  }

}

const styles = StyleSheet.create({
  bottomLoading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  bottomLoadingText: {
    fontSize: 12,
    color: '#999999',
    marginRight: 5,
  },
  bottomLoadingImg: {
    width: 12,
    height: 12,
  },
});