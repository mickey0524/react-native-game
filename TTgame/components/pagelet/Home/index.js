import React, { Component } from 'react';
import {
  View,
  ActionSheetIOS,
  Linking,
  StyleSheet,
} from 'react-native';

import ActionSheet from 'react-native-actionsheet';

import TabContainer from './ViewPager';
import ToolBar from '../../common/ToolBar';
import { MyStatusBar } from '../../common/MyStatusBar';
import { isAndroid } from '../../../conf/deviceParam';

const URL_PREFIX = 'https://ic.snssdk.com/game_channel/',
  CANCEL_INDEX = 2,
  OPTIONS = ['在浏览器中打开', '分享', '取消'];

export default class Home extends Component {
  
  static navigationOptions = {
    drawerLabel: null,
  }

  constructor(props) {
    super(props);
    this.routeName = 'feed';    
    this.onPressTabNav = this.onPressTabNav.bind(this);
    this.onPressToolBarMore = this.onPressToolBarMore.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        {
          isAndroid &&
          <ActionSheet
            ref={o => this.ActionSheet = o}
            options={OPTIONS}
            cancelButtonIndex={CANCEL_INDEX}
            onPress={this.handlePress} />
        }
        <MyStatusBar />
        <ToolBar title={'今日游戏'}
          leftIcon={'menu'}
          rightIcon={['more', 'search']}
          onPressToolBarMore={this.onPressToolBarMore}
          screenProps={this.props.screenProps}
          navigation={this.props.navigation} />
        <TabContainer screenProps={this.props.screenProps} onPressTabNav={this.onPressTabNav}/>
      </View>
    );
  }

  /**
   * 当press Tab导航时调用
   * @param {String} routeName 当前tab routeName
   */
  onPressTabNav(routeName) {
    this.routeName = routeName;
  }

  /**
   * 点击ActionSheet的回调函数
   * @param {Number} index button的索引 
   */
  handlePress(index) {
    if (index == 0) {
      Linking.openURL(`${URL_PREFIX}${this.routeName}`);
    } else if (index == 1) {

    }
  }

  /**
   * 当点击toolBar上的more icon
   */
  onPressToolBarMore() {
    if (isAndroid) {
      this.ActionSheet.show();
    } else {
      ActionSheetIOS.showActionSheetWithOptions({
        options: OPTIONS,
        cancelButtonIndex: CANCEL_INDEX,
      }, this.handlePress);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})