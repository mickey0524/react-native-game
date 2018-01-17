import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
} from 'react-native';

const totalWidth = Dimensions.get('window').width;

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bottom: new Animated.Value(-40),
    }
    this.showAnimation = this.showAnimation.bind(this);
    this.hideAnimation = this.hideAnimation.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if (!this.props.isMessageShow && nextProps.isMessageShow) {
      this.showAnimation();
      this.timer = setTimeout(() => {
        this.hideAnimation();
      }, 2000);
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <Animated.View style={[styles.container, { bottom: this.state.bottom }]}>
        <Text style={styles.content}>{this.props.content}</Text>
      </Animated.View>
    );
  }

  /**
   * message框显示动画
   */
  showAnimation() {
    Animated.timing(this.state.bottom, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

  /**
   * message框隐藏动画
   */
  hideAnimation() {
    Animated.timing(this.state.bottom, {
      toValue: -40,
      duration: 200,
      easing: Easing.linear,
    }).start(() => { this.props.onMessageHide && this.props.onMessageHide() });
  }
}

Message.propTypes = {
  content: PropTypes.string.isRequired,
  isMessageShow: PropTypes.bool.isRequired,
  onMessageHide: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 15,
    position: 'absolute',
    width: totalWidth,
    height: 40,
    bottom: 0,
    backgroundColor: '#323232',
  },
  content: {
    fontSize: 16,
    color: '#FFF',
  },
});