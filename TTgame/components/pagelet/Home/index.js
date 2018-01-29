import React, { Component } from 'react';
import {
  View,
  ActionSheetIOS,
  StyleSheet,
} from 'react-native';

import TabContainer from './ViewPager';
import ToolBar from '../../common/ToolBar';
import { MyStatusBar } from '../../common/MyStatusBar';
import { isAndroid } from '../../../conf/deviceParam';

export default class Home extends Component {
  
  static navigationOptions = {
    drawerLabel: null,
  }

  constructor(props) {
    super(props);
    this.routeName = 'feed';    
    this.onPressTabNav = this.onPressTabNav.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
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
   * 当点击toolBar上的more icon
   */
  onPressToolBarMore() {
    if (isAndroid) {

    } else {
      ActionSheetIOS.showActionSheetWithOptions({
        options: ['在浏览器中打开', '分享', '取消'],
        cancelButtonIndex: 2,
      },
      (index) => {
        console.log(index);
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})