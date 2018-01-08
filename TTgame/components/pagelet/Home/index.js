import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import TabContainer from './ViewPager';
import ToolBar from '../../common/ToolBar';
import { MyStatusBar } from '../../common/MyStatusBar';
import color from '../../../conf/color';

export default class Hello extends Component {
  
  static navigationOptions = {
    drawerLabel: null,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar />
        <ToolBar title={'今日游戏'} leftIcon={'menu'} navigation={this.props.navigation}/>
        <TabContainer screenProps={this.props.screenProps}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})