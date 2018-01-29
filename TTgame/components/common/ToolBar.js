import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  Text,
  ActionSheetIOS,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import color from '../../conf/color';
import { totalWidth } from '../../conf/deviceParam';

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.onPressLeftIcon = this.onPressLeftIcon.bind(this);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.mode == nextProps.mode) {
      return true;
    }    
    return this.props.theme.themeColor != nextProps.themeColor;
  }

  render() {
    let isNightMode = this.props.mode == 'night';
    return (
      <View style={[styles.toolBar, { backgroundColor: this.props.theme.themeColor }]}>
        <TouchableWithoutFeedback onPress={() => this.onPressLeftIcon()}>
          {
            this.props.leftIcon == 'back' ?
            <Icon name='md-arrow-back' style={styles.leftIconWrap} size={25} color={isNightMode ? '#252525' : '#FFF'} /> :
            <Icon name='md-menu' style={styles.leftIconWrap} size={25} color={isNightMode ? '#252525' : '#FFF'} />
          }
        </TouchableWithoutFeedback>
        <Text style={[styles.title, {color: isNightMode ? '#252525' : '#FFF'}]} numberOfLines={1}>{this.props.title}</Text>
        {
          this.props.rightIcon &&
          this.props.rightIcon.map((icon, index) => {
            return (
              <TouchableWithoutFeedback key={index} onPress={() => this.onPressRightIcon(icon)}>
                {
                  icon == 'search' ?
                  <Icon name="ios-search" style={[styles.rightIconWrap, { right: 25 * (2 * index + 1) / 375 * totalWidth}]} size={25} color={isNightMode ? '#252525' : '#FFF'} /> :
                  <Icon name="ios-more" style={[styles.rightIconWrap, { right: 25 * (2 * index + 1) / 375 * totalWidth }]} size={25} color={isNightMode ? '#252525' : '#FFF'} />
                }
              </TouchableWithoutFeedback>
            );
          })
        }
      </View>
    );
  }

  /**
   * 点击toolbar左端的icon，当左端为back的时候回到上个页面，为menu的时候展开抽屉菜单栏
   */
  onPressLeftIcon() {
    if (this.props.leftIcon == 'back') {
      this.props.navigation.goBack();
    } else {
      this.props.navigation.navigate('DrawerOpen');
    }
  }

  /**
   * 点击toolbar右端的icon
   * @param {String} mark 区分右边icon的种类
   */
  onPressRightIcon(mark) {
    if (mark == 'search') {
      let { navigate } = this.props.screenProps;
      navigate('Search');
    } else {
      (this.props.onPressToolBarMore && this.props.onPressToolBarMore());
    }
  }
}

const mapStateToProps = (state) => {
  let { theme, mode } = state;
  return {
    theme,
    mode,
  }
}

export default connect(mapStateToProps)(ToolBar);

const styles = StyleSheet.create({
  toolBar: {
    width: totalWidth,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: color.SKY_BLUE,
  },
  leftIconWrap: {
    // width: 40,
    // height: 50,
    // lineHeight: 55,
    position: 'absolute',
    left: 25 / 375 * totalWidth,
    // textAlign: 'center',
  },
  rightIconWrap: {
    // width: 40,
    // height: 50,
    // lineHeight: 55,
    position: 'absolute',
    // right: 25 / 375 * totalWidth,
    // textAlign: 'center',
  },
  title: {
    fontSize: 20,
    // color: '#FFF',
    width: 200 / 375 * totalWidth,
    textAlign: 'center',
  },
});