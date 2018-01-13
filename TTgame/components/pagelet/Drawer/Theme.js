import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  AsyncStorage,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import { changeTheme } from '../../../redux/action/theme';
import ToolBar from '../../common/ToolBar';
import { MyStatusBar } from '../../common/MyStatusBar';
import Icon from 'react-native-vector-icons/Octicons';
import Picker from 'react-native-picker';
import color, { color2name, name2color, rgb2name } from '../../../conf/color';
import { fetchTheme, setTheme } from '../../../dao/index';

class Theme extends Component {

  constructor(props) {
    super(props);
    this.state = {
      themeColor: rgb2name[this.props.theme.themeColor],
      focusColor: rgb2name[this.props.theme.focusColor],
    }
    this.isPickerOpen = false;
    this.onPressSelect = this.onPressSelect.bind(this);
    this.onPressWrap = this.onPressWrap.bind(this);
  }

  componentWillUnmount() {
    if (this.isPickerOpen) {
      Picker.hide();
    }
  } 

  render() {
    let isNightMode = this.props.mode == 'night';
    return (
      <TouchableWithoutFeedback onPress={this.onPressWrap}>
        <View style={[styles.container, { backgroundColor: isNightMode ? '#252525' : '#FFF' }]}>
          <MyStatusBar />
          <ToolBar title={'主题'} navigation={this.props.navigation} leftIcon={'back'} />
          <View style={styles.optionWrap}>
            <View>
              <Text style={{ color: isNightMode ? '#FFF' : '#000' }}>主题的默认颜色</Text>
              <Text style={{ fontSize: 12, color: isNightMode ? '#FFF' : '#999', marginTop: 3 }}>
                当前颜色：<Text style={{ color: color[this.state.themeColor]}}>
                          {color2name[this.state.themeColor]}
                        </Text>
              </Text>
            </View>
            <TouchableWithoutFeedback onPress={() => this.onPressSelect('themeColor')}>
              <View style={styles.selectColor}>
                <Text style={{ color: isNightMode ? '#FFF' :'#999', marginRight: 15 }}>{color2name[this.state.themeColor]}</Text>
                <Icon name='rocket' size={20} color={isNightMode ? '#FFF' : '#999'}/> 
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.optionWrap}>
            <View>
              <Text style={{ color: isNightMode ? '#FFF' : '#000' }}>主题的强调颜色</Text>
              <Text style={{ fontSize: 12, color: isNightMode ? '#FFF' : '#999', marginTop: 3 }}>
                当前颜色：<Text style={{ color: color[this.state.focusColor] }}>
                  {color2name[this.state.focusColor]}
                </Text>
              </Text>
            </View>
            <TouchableWithoutFeedback onPress={() => this.onPressSelect('focusColor')}>
              <View style={styles.selectColor}>
                <Text style={{ color: isNightMode ? '#FFF' : '#999', marginRight: 15 }}>{color2name[this.state.focusColor]}</Text>
                <Icon name='rocket' size={20} color={isNightMode ? '#FFF' : '#999'} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  /**
   * 当Picker唤起的时候，点击屏幕其他区域，关闭Picker
   */
  onPressWrap() {
    if (this.isPickerOpen) {
      Picker.hide();
      this.isPickerOpen = false;
    }
  }

  /**
   * 点击屏幕上的选择颜色
   * @param {string} mark 区分是选择主题颜色，还是强调颜色 
   */
  onPressSelect(mark) {
    this.isPickerOpen = true;
    this[mark] = this.state[mark];
    let title = mark == 'themeColor' ? '请选择主题颜色' : '请选择强调颜色';
    Picker.init({
      pickerTitleText: title,
      pickerData: Object.keys(name2color),
      selectedValue: [color2name[this.state[mark]]],
      onPickerConfirm: data => {
        let theme = {
          themeColor: color[this.state.themeColor],
          focusColor: color[this.state.focusColor],
        }
        this.props.changeTheme(theme);
        setTheme(JSON.stringify(theme));
        // AsyncStorage.setItem('theme', JSON.stringify(theme));
      },
      onPickerCancel: () => {
        this.setState({
          [mark]: this[mark], 
        });
      },
      onPickerSelect: data => {
        this.setState({
          [mark]: name2color[data[0]],
        });
      }
    });
    Picker.show();
  }
}

const mapStateToProps = (state) => {
  let { theme, mode } = state;
  return {
    theme,
    mode,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeTheme: (theme) => dispatch(changeTheme(theme)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Theme);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFF',
  },
  optionWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  selectColor: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});