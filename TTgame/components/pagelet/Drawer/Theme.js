import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import { changeFocusColor, changeThemeColor } from '../../../redux/action/theme';
import ToolBar from '../../common/ToolBar';
import { MyStatusBar } from '../../common/MyStatusBar';
import Icon from 'react-native-vector-icons/Octicons';
import Picker from 'react-native-picker';
import color, { color2name, name2color, rgb2name } from '../../../conf/color';

class Theme extends Component {

  constructor(props) {
    super(props);
    this.state = {
      themeColor: rgb2name[this.props.theme.themeColor],
      focusColor: rgb2name[this.props.theme.focusColor],
    }
    this.onPressSelect = this.onPressSelect.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar backgroundColor={color.SKY_BLUE} barStyle={'light-content'} />
        <ToolBar title={'主题'} navigation={this.props.navigation} leftIcon={'back'} />
        <View style={styles.optionWrap}>
          <View>
            <Text>主题的默认颜色</Text>
            <Text style={{ fontSize: 12, color: '#999', marginTop: 3 }}>
              当前颜色：<Text style={{ color: color[this.state.themeColor]}}>
                        {color2name[this.state.themeColor]}
                      </Text>
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={() => this.onPressSelect('themeColor')}>
            <View style={styles.selectColor}>
              <Text style={{ color: '#999', marginRight: 15 }}>{color2name[this.state.themeColor]}</Text>
              <Icon name='rocket' size={20} color={'#999'}/> 
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.optionWrap}>
          <View>
            <Text>主题的强调颜色</Text>
            <Text style={{ fontSize: 12, color: '#999', marginTop: 3 }}>
              当前颜色：<Text style={{ color: color[this.state.focusColor] }}>
                {color2name[this.state.focusColor]}
              </Text>
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={() => this.onPressSelect('focusColor')}>
            <View style={styles.selectColor}>
              <Text style={{ color: '#999', marginRight: 15 }}>{color2name[this.state.focusColor]}</Text>
              <Icon name='rocket' size={20} color={'#999'} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  /**
   * 点击屏幕上的选择颜色
   * @param {string} mark 区分是选择主题颜色，还是强调颜色 
   */
  onPressSelect(mark) {
    this[mark] = this.state[mark];
    Picker.init({
      pickerData: Object.keys(name2color),
      selectedValue: [color2name[this.state[mark]]],
      onPickerConfirm: data => {
        
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
  let { theme } = state;
  return {
    theme,
  }
}

const mapDispatchToProps = () => {
  return {
    changeFocusColor,
    changeThemeColor,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Theme);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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