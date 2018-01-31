import React, { Component } from 'react';
import {
  View,
  ActionSheetIOS,
  Linking,
  StyleSheet,
} from 'react-native';

import ActionSheet from 'react-native-actionsheet';
import Share from 'react-native-share';

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
      let shareOptions = {
        url: `${URL_PREFIX}${this.routeName}`,
        subject: "今日游戏精品推荐",
      };
      switch (this.routeName) {
        case 'Feed':
          shareOptions.message = '今日游戏精品推荐～';
          break;
        case 'Hall':
          shareOptions.message = '今日游戏游戏大厅～';
          break;
        case 'Rank':
          shareOptions.message = '今日游戏热门榜单～';
          break;
        default:
          break;
      }
      Share.open(shareOptions).catch((err) => { err && console.log(err); });
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