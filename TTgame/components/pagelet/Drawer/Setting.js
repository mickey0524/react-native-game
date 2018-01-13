import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Switch,
  AsyncStorage,
  StyleSheet,
} from 'react-native';

import ToolBar from '../../common/ToolBar';
import { MyStatusBar } from '../../common/MyStatusBar';
import { changeMode } from '../../../redux/action/mode';
import { changeLoadImgMode } from '../../../redux/action/netInfo';
import { setMode, setLoadImgMode } from '../../../dao/index'; 

class Setting extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isNightMode: this.props.mode == 'night',
      isMobileNetAutoLoadImg: this.props.loadImgWithoutWifi,
    }
    this.onSwitchChange = this.onSwitchChange.bind(this);
  }
  
  render() {
    let isNightMode = this.state.isNightMode;
    return (
      <View style={{ flex: 1, backgroundColor: isNightMode ? '#252525' : '#FFF' }}>
        <MyStatusBar />
        <ToolBar title={'设置'} navigation={this.props.navigation} leftIcon={'back'} />
        <View>
          <View style={styles.optionWrap}>
            <Text style={[styles.optionTitle, { color: isNightMode ? '#FFF' : '#000' }]}>夜间模式</Text>
            <Switch
              value={this.state.isNightMode} 
              onValueChange={(newVal) => this.onSwitchChange(newVal, 'isNightMode')} />
          </View>
          <View style={styles.optionWrap}>
            <Text style={[styles.optionTitle, { color: isNightMode ? '#FFF' : '#000' }]}>使用移动网络时默认加载图片</Text>
            <Switch
              value={this.state.isMobileNetAutoLoadImg} 
              onValueChange={(newVal) => this.onSwitchChange(newVal, 'isMobileNetAutoLoadImg')}/>        
          </View>
          <View style={styles.optionWrap}>
            <Text style={[styles.optionTitle, { color: isNightMode ? '#FFF' : '#000' }]} 
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
    if (mark == 'isNightMode') {
      let mode = newVal ? 'night' : 'day';
      this.props.changeMode(mode);
      setMode(mode);
    } else {
      this.props.changeLoadImgMode(newVal);
      setLoadImgMode(String(newVal));
    }
  }

  /**
   * 点击清空缓存
   */
  onPressClearStorage() {
    
  }
}

const mapStateToProps = (state) => {
  let { mode, loadImgWithoutWifi } = state;
  return {
    mode,
    loadImgWithoutWifi,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeMode: (mode) => dispatch(changeMode(mode)),
    changeLoadImgMode: (ifLoadImgWithoutWifi) => dispatch(changeLoadImgMode(ifLoadImgWithoutWifi)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);

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