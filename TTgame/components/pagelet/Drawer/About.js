import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import ToolBar from '../../common/ToolBar';
import { MyStatusBar } from '../../common/MyStatusBar';
import color from '../../../conf/color';

export default class Setting extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyStatusBar />
        <ToolBar title={'关于'} navigation={this.props.navigation} leftIcon={'back'} />
        <Text>我爱你</Text>
      </View>
    );
  }
}