import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native';

import { MyStatusBar } from '../common/MyStatusBar';
import { SEARCH } from '../../conf/api';
import Icon from 'react-native-vector-icons/Ionicons';

const dpr = PixelRatio.get();
const { height: totalHeight } = Dimensions.get('window');
const limit = Math.floor((totalHeight - 44) / 42);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyWordArr: [],
      searchKeyWord: '',
      afterFirstFetch: false,
    }
    this.fetchKeyWord = this.fetchKeyWord.bind(this);
    this.onPressDelete = this.onPressDelete.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onPressBackOrCancel = this.onPressBackOrCancel.bind(this);
  }

  componentWillMount() {
    this.fetchKeyWord();
  }
  
  render() {
    let isNightMode = this.props.mode == 'night';
    return (
      <View style={[ styles.container, { backgroundColor: isNightMode ? '#252525' : '#FFF' }]}>
        <MyStatusBar />

        <View style={styles.searchBarWrap}>
          <Text style={{ marginHorizontal: 14 }} onPress={this.onPressBackOrCancel}>
            <Icon name="ios-arrow-back" size={24} color={'#000'} />
          </Text>
          <TextInput
            refs={(input) => { this.input = input; } }
            style={styles.textInput}
            autoFocus={true}
            value={this.state.searchKeyWord}
            onChangeText={(searchKeyWord) => { this.onInputChange(searchKeyWord); }}
            placeholder={'请输入关键字'} />
          <Icon name="ios-search" size={20} style={styles.searchIconWrap} color={isNightMode ? '#FFF' : '#707070'} />
          <Text style={styles.deleteIconWrap} onPress={this.onPressDelete}>
            <Icon name="ios-close-circle" size={20} color={isNightMode ? '#FFF' : '#707070'} />
          </Text>
          <Text style={styles.cancelText} onPress={this.onPressBackOrCancel}>取消</Text>
        </View>

        <View>
          {
            this.state.keyWordArr.length == 0 ?
              this.state.afterFirstFetch && <Text style={styles.noResTip}>抱歉，没有找到相关信息</Text> :
              <View>
                {
                  this.state.keyWordArr.map((item, index) => {
                    return (
                      <View key={index} style={styles.keyWordItem}>
                        {
                          this.state.searchKeyWord.length == 0 ?
                            <Icon name="ios-time-outline" size={20} color={isNightMode ? '#FFF' : '#CACACA'} /> :
                            <Icon name="ios-search" size={20} color={isNightMode ? '#FFF' : '#CACACA'} />
                        }
                        <Text style={{ marginLeft: 14 }}>{item}</Text>
                      </View>
                    );
                  })
                }
              </View>
          }
        </View>
      </View>
    );
  }

  /**
   * 拉取搜索关键字
   */
  fetchKeyWord() {
    let keyWord = this.state.searchKeyWord;
    let url = `${SEARCH}&limit=${limit}&variety=0&keyword=${keyWord}`;
    fetch(url).then(res => res.json()).then(data => {
      let keyWordArr = data.data;
      this.setState({
        keyWordArr,
        afterFirstFetch: true,
      });
    });
  }

  /**
   * 输入框发生变化
   * @param {String} searchKeyWord 输入框内当前关键词
   */
  onInputChange(searchKeyWord) {
    this.setState({ searchKeyWord }, () => {
      this.fetchKeyWord();      
    });
  }

  /**
   * 点击输入框右端删除按钮
   */
  onPressDelete() {
    this.setState({ searchKeyWord: '' }, () => {
      this.fetchKeyWord();
    });
  }

  /**
   * 点击页面左上角返回icon或右上角取消
   */
  onPressBackOrCancel() {
    this.props.navigation.goBack();
  }
}

const mapStateToProps = (state) => {
  let { mode, theme } = state;
  return {
    mode,
    theme,
  }
}

export default connect(mapStateToProps)(Search);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarWrap: {
    display: 'flex',
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1 / dpr,
    borderColor: '#E8E8E8',
  },
  textInput: {
    width: 273,
    height: 28,
    borderColor: '#E8E8E8',
    borderWidth: 1 / dpr,
    borderStyle: 'solid',
    backgroundColor: '#F4F5F6',
    borderRadius: 4,
    paddingHorizontal: 32,
  },
  searchIconWrap: {
    position: 'absolute',
    backgroundColor: '#F4F5F6',
    left: 46,
  },
  deleteIconWrap: {
    position: 'absolute',
    backgroundColor: '#F4F5F6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    right: 71, 
  },
  cancelText: {
    marginLeft: 15,
    fontSize: 17,
    color: '#2A90D7',
  },
  noResTip: {
    height: 42,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 42,
    borderStyle: 'solid',
    borderWidth: 1 / dpr,
    borderColor: '#E8E8E8',
  },
  keyWordItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    paddingLeft: 15,
    borderStyle: 'solid',
    borderWidth: 1 / dpr,
    borderColor: '#E8E8E8',
  }
});