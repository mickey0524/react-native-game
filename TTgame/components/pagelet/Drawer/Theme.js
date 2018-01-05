import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import ToolBar from '../../common/ToolBar';
import { MyStatusBar } from '../../common/MyStatusBar';
import Icon from 'react-native-vector-icons/Ionicons';
import { SKY_BLUE } from '../../../conf/color';

export default class DrawerHome extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyStatusBar backgroundColor={SKY_BLUE} barStyle={'light-content'} />
        <ToolBar title={'主题'} navigation={this.props.navigation} leftIcon={'back'} />
        <Text>我爱你</Text>
      </View>
    );
  }
}