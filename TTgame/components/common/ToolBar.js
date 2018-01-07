import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import color from '../../conf/color';

const totalWidth = Dimensions.get('window').width;

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.onPressLeftIcon = this.onPressLeftIcon.bind(this);
  }

  render() {
    let isNightMode = this.props.mode == 'night';
    return (
      <View style={[styles.toolBar, { backgroundColor: this.props.theme.themeColor }]}>
        { 
          <Text style={styles.backIconWrap} onPress={() => this.onPressLeftIcon()}>
            {
              this.props.leftIcon == 'back' ?
              <Icon name='md-arrow-back' size={25} color={isNightMode ? '#252525' : '#FFF'} /> :
              <Icon name='md-menu' size={25} color={isNightMode ? '#252525' : '#FFF'} />
            }
          </Text>
        }
        <Text style={[styles.title, {color: isNightMode ? '#252525' : '#FFF'}]} numberOfLines={1}>{this.props.title}</Text>
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
  backIconWrap: {
    width: 40,
    height: 50,
    lineHeight: 55,
    position: 'absolute',
    left: 15,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    // color: '#FFF',
    width: 200,
    textAlign: 'center',
  },
});