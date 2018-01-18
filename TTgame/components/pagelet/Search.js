import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { totalHeight, dpr } from '../../conf/deviceParam';
import { MyStatusBar } from '../common/MyStatusBar';
import { SEARCH } from '../../conf/api';
import { getImgUrl } from '../.././utils/util';

const limit = Math.floor((totalHeight - 44) / 42);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyWordArr: [],
      searchKeyWord: '',
      afterFirstFetch: false,
      isSearchFinish: false,
      relatedGameList: [],
      similarGameList: [],
    }
    this.onTextInputFocus = this.onTextInputFocus.bind(this);
    this.genGameItem = this.genGameItem.bind(this);
    this.onFinishSearch = this.onFinishSearch.bind(this);
    this.onPressKeywordItem = this.onPressKeywordItem.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
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

        <View style={[styles.searchBarWrap, { borderColor: isNightMode ? '#424242' : '#E8E8E8' }]}>
          <Text style={{ marginHorizontal: 14 }} onPress={this.onPressBackOrCancel}>
            <Icon name="ios-arrow-back" size={24} color={ isNightMode ? '#FFF' : '#000' } />
          </Text>
          <TextInput
            ref={(input) => { this.input = input; } }
            style={[styles.textInput,
              { backgroundColor: isNightMode ? '#252525' : '#F4F5F6',
                borderColor: isNightMode ? '#424242' : '#E8E8E8',
                color: isNightMode ? '#FFF' : '#000' }]}
            autoFocus={true}
            onFocus={this.onTextInputFocus}
            value={this.state.searchKeyWord}
            onSubmitEditing={this.onPressSubmit}
            onChangeText={(searchKeyWord) => { this.onInputChange(searchKeyWord); }}
            placeholderTextColor={ isNightMode ? '#FFF' : '#000' }
            placeholder={'请输入关键字'} />
          <Icon name="ios-search" size={20}
            style={[styles.searchIconWrap, { backgroundColor: isNightMode ? '#252525' : '#F4F5F6' }]}
            color={isNightMode ? '#FFF' : '#707070'} />
          <Text style={[styles.deleteIconWrap, , { backgroundColor: isNightMode ? '#252525' : '#F4F5F6' }]} onPress={this.onPressDelete}>
            <Icon name="ios-close-circle" size={20} color={isNightMode ? '#FFF' : '#707070'} />
          </Text>
          <Text style={[styles.cancelText, { color: this.props.theme.focusColor }]} 
            onPress={this.onPressBackOrCancel}>
            取消
          </Text>
        </View>

        <View>
          { 
            !this.state.isSearchFinish && 
            <View>
              {
                this.state.keyWordArr.length == 0 ?
                  this.state.afterFirstFetch && 
                  <View style={{ borderColor: isNightMode ? '#424242' : '#E8E8E8', borderStyle: 'solid', borderBottomWidth: 1 / dpr }}>
                    <Text style={[styles.noResTip, { color: isNightMode ? '#FFF' : '#999' }]}>
                      抱歉，没有找到相关信息
                    </Text>
                  </View> :
                  <View>
                    {
                      this.state.keyWordArr.map((item, index) => {
                        return (
                          <TouchableWithoutFeedback key={index} onPress={() => { this.onPressKeywordItem(item) }}>
                            <View style={[styles.keyWordItem, { borderColor: isNightMode ? '#424242' : '#E8E8E8' }]}>
                              {
                                this.state.searchKeyWord.length == 0 ?
                                  <Icon name="ios-time-outline" size={20} color={isNightMode ? '#FFF' : '#CACACA'} /> :
                                  <Icon name="ios-search" size={20} color={isNightMode ? '#FFF' : '#CACACA'} />
                              }
                              <Text style={{ marginLeft: 14, color: isNightMode ? '#FFF' : '#000' }}>{item}</Text>
                            </View>
                          </TouchableWithoutFeedback>
                        );
                      })
                    }
                  </View>
              }
            </View>
          }
          {
            this.state.isSearchFinish &&
            <View>
              <View>
                {
                  this.state.relatedGameList.length > 0 &&
                  <View style={[styles.relatedGameList, { borderColor: isNightMode ? '#424242' : 'F3F4F5' }]}>
                    {
                      this.state.relatedGameList.map((item, index) => this.genGameItem(item, index, 'relate'))
                    }
                  </View>
                }
              </View>
              <View>
                {
                  this.state.similarGameList.length > 0 &&
                  <View style={styles.similarGameList}>
                    {
                      this.state.similarGameList.map((item, index) => this.genGameItem(item, index, 'similar'))
                    }
                  </View>
                }
              </View>
            </View>
          }
        </View>
      </View>
    );
  }

  /**
   * 生成游戏item
   * @param {Object} item 游戏item
   * @param {Number} index 索引
   * @param {String} mark 标识
   */
  genGameItem(item, index, mark) {
    let isNightMode = this.props.mode == 'night';    
    return (
      <View key={index}
        style={[styles.gameItem,
          { borderColor: isNightMode ? '#424242' : '#E8E8E8' },
          mark == 'relate' && index == this.state.relatedGameList.length - 1 && { borderBottomWidth: 0 }]}>
        <Image
          source={{ uri: getImgUrl(item.avatar, 'SEARCH_RES_ICON') }}
          style={styles.gameIcon} />
        <View style={styles.gameInfo}>
          <Text numberOfLines={1} style={[styles.gameName, { color: isNightMode ? '#FFF' : '#222' }]}>{item.name}</Text>
          <Text numberOfLines={1} style={[styles.gameDesc, { color: isNightMode ? '#FFF' : '#999' }]}>{item.size}</Text>
          <Text numberOfLines={1} style={[styles.gameDesc, { color: isNightMode ? '#FFF' : '#999' }]}>{item.desc}</Text>
        </View>
        <View style={[styles.downloadWrap, { backgroundColor: this.props.theme.focusColor }]}>
          <Text style={styles.download}>下载</Text>
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
    this.setState({ searchKeyWord: '', isSearchFinish: false }, () => {
      this.fetchKeyWord();
      this.input.focus();
    });
  }

  /**
   * 当输入框获得焦点 
   */
  onTextInputFocus() {
    this.setState({ isSearchFinish: false }, () => {
      this.fetchKeyWord();
    });
  }

  /**
   * 点击页面左上角返回icon或右上角取消
   */
  onPressBackOrCancel() {
    this.props.navigation.goBack();
  }

  /**
   * 点击软键盘的确定 
   */
  onPressSubmit() {
    if (this.state.searchKeyWord) {
      this.onFinishSearch(this.state.searchKeyWord);
    }
  }

  /**
   * 点击推荐列表的元素
   * @param {String} keyword 关键词
   */
  onPressKeywordItem(keyword) {
    this.input.blur();    
    this.setState({
      searchKeyWord: keyword,
    }, () => {
      this.onFinishSearch(keyword);
    })
  }

  /**
   * 进入搜索结果页面
   * @param {String} keyword 关键字
   */
  onFinishSearch(keyword) {
    this.setState({ isSearchFinish: true }, () => {
      let url = `${SEARCH}&variety=1&keyword=${keyword}`;
      fetch(url).then(res => res.json()).then(data => {
        data = data.data;
        this.setState({
          relatedGameList: data.related_game_list,
          similarGameList: data.similar_game_list,
        });
      })
    });
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
    borderBottomWidth: 1 / dpr,
    // borderColor: '#E8E8E8',
  },
  textInput: {
    width: 273,
    height: 28,
    borderColor: '#E8E8E8',
    borderWidth: 1 / dpr,
    borderStyle: 'solid',
    // backgroundColor: '#F4F5F6',
    borderRadius: 4,
    paddingHorizontal: 32,
  },
  searchIconWrap: {
    position: 'absolute',
    // backgroundColor: '#F4F5F6',
    left: 46,
  },
  deleteIconWrap: {
    position: 'absolute',
    // backgroundColor: '#F4F5F6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    right: 71, 
  },
  cancelText: {
    marginLeft: 15,
    fontSize: 17,
    // color: '#2A90D7',
  },
  noResTip: {
    height: 42,
    fontSize: 16,
    // color: '#999',
    textAlign: 'center',
    lineHeight: 42,
    // borderColor: '#E8E8E8',
  },
  keyWordItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    paddingLeft: 15,
    borderStyle: 'solid',
    borderBottomWidth: 1 / dpr,
    // borderColor: '#E8E8E8',
  },
  relatedGameList: {
    borderStyle: 'solid',
    // borderColor: '#F3F4F5',
    borderBottomWidth: 6,
  },
  gameItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    paddingVertical: 15,
    borderStyle: 'solid',
    // borderColor: '#E8E8E8',
    borderBottomWidth: 1 / dpr,
  },
  gameIcon: {
    width: 59,
    height: 59,
    borderRadius: 12,
    marginRight: 15,
  },
  gameInfo: {
    width: 197,
    marginRight: 15,
  },
  gameName: {
    fontSize: 14,
    // color: '#222',
  },
  gameDesc: {
    fontSize: 12,
    // color: '#999',
    marginTop: 4,
  },
  downloadWrap: {
    width: 58,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#498FD2',
    borderRadius: 4,
    overflow: 'hidden',
  },
  download: {
    fontSize: 14,
    color: '#FFF',
  },
});