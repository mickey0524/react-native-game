import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import ToolBar from '../../common/ToolBar';
import { MyStatusBar } from '../../common/MyStatusBar';
import color from '../../../conf/color';

class Setting extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let isNightMode = this.props.mode == 'night';
    let textColor = { color: isNightMode ? '#FFF' : '#000' };
    return (
      <View style={{ flex: 1, backgroundColor: isNightMode ? '#252525' : '#FFF' }}>
        <MyStatusBar />
        <ToolBar title={'关于'} navigation={this.props.navigation} leftIcon={'back'} />
        <View style={styles.formItem}>
          <Text style={[styles.formLabel, textColor]}>作者</Text>
          <Text style={textColor}>Mickey0524 (baihao0524@gmail.com)</Text>
        </View>
        <View style={styles.formItem}>
          <Text style={[styles.formLabel, textColor]}>源码</Text>
          <Text style={textColor}>https://github.com/mickey0524/game</Text>
        </View>
        <View style={styles.formItem}>
          <Text style={[styles.formLabel, textColor]}>PC地址</Text>
          <Text style={textColor}>https://ic.snssdk.com/game_channel/feed</Text>
        </View>
        <View style={styles.formItem}>
          <Text style={[styles.formLabel, textColor]}>个人声明</Text>
          <Text style={textColor}>编写这个app纯属为了练习RN~</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let { mode } = state;
  return {
    mode,
  }
}

export default connect(mapStateToProps)(Setting);

const styles = StyleSheet.create({
  formItem: {
    padding: 15,
  },
  formLabel: {
    marginBottom: 3,
    fontSize: 16,
  },
});