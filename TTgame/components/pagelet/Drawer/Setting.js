import React, { Component } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
} from 'react-native';

import ToolBar from '../../common/ToolBar';
import { MyStatusBar } from '../../common/MyStatusBar';
import color from '../../../conf/color';

export default class Setting extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isNightMode: false,
      isMobileNetAutoLoadImg: false,
    }
    this.onSwitchChange = this.onSwitchChange.bind(this);
  }
  
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <MyStatusBar barStyle={'light-content'} />
        <ToolBar title={'设置'} navigation={this.props.navigation} leftIcon={'back'} />
        <View>
          <View style={styles.optionWrap}>
            <Text style={styles.optionTitle}>夜间模式</Text>
            <Switch
              value={this.state.isNightMode} 
              onValueChange={(newVal) => this.onSwitchChange(newVal, 'isNightMode')} />
          </View>
          <View style={styles.optionWrap}>
            <Text style={styles.optionTitle}>使用移动网络时默认加载图片</Text>
            <Switch
              value={this.state.isMobileNetAutoLoadImg} 
              onValueChange={(newVal) => this.onSwitchChange(newVal, 'isMobileNetAutoLoadImg')}/>        
          </View>
          <View style={styles.optionWrap}>
            <Text style={styles.optionTitle} 
              onPress={this.onPressClearStorage}>
              清空缓存
            </Text>
          </View>
        </View>
      </View>
    );
  }

  /**
   * 当点击switch切换状态
   * @param {boolean} newVal switch改变后的数值
   * @param {string} mark 标记，用于区分
   */
  onSwitchChange(newVal, mark) {
    this.setState({
      [mark]: newVal,
    });
  }

  /**
   * 点击清空缓存
   */
  onPressClearStorage() {
    
  }
}

const styles = StyleSheet.create({
  optionWrap: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 16,
  }
});