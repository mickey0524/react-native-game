import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import TabContainer from './ViewPager';
import ToolBar from '../../common/ToolBar';
import { MyStatusBar } from '../../common/MyStatusBar';
import { SKY_BLUE } from '../../../conf/color';

export default class Hello extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar backgroundColor={SKY_BLUE} barStyle={'light-content'} />
        <ToolBar title={'今日游戏'} isLeftIconShow={false} />
        <TabContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})