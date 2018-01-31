import React, { Component } from 'react';
import {
  View,
  Linking,
  ActionSheetIOS,
  StyleSheet,
  WebView,
} from 'react-native';

import ActionSheet from 'react-native-actionsheet';
import Share from 'react-native-share';

import { MyStatusBar } from '../../common/MyStatusBar';
import ToolBar from '../../common/ToolBar';
import { isAndroid } from '../../../conf/deviceParam';

const CANCEL_INDEX = 2,
  OPTIONS = ['在浏览器中打开', '分享', '取消'];

export default class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.source = this.props.navigation.state.params.source;
    this.articleName = this.props.navigation.state.params.articleName;
    this.handlePress = this.handlePress.bind(this);
    this.onPressToolBarMore = this.onPressToolBarMore.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        {
          isAndroid &&
          <ActionSheet
            ref={o => this.ActionSheet = o}
            options={OPTIONS}
            cancelButtonIndex={CANCEL_INDEX}
            onPress={this.handlePress} />
        }
        <MyStatusBar />
        <ToolBar
          title={this.articleName}
          navigation={this.props.navigation}
          onPressToolBarMore={this.onPressToolBarMore}
          leftIcon={'back'}
          rightIcon={['more']} />
        <WebView
          scalesPageToFit={true}
          source={{ uri: this.source }}
          startInLoadingState={true} />
      </View>
    );
  }

  /**
   * 点击ActionSheet的回调函数
   * @param {Number} index button的索引 
   */
  handlePress(index) {
    if (index == 0) {
      Linking.openURL(this.source);
    } else if (index == 1) {
      let shareOptions = {
        url: this.source,
        message: this.articleName,
        subject: this.articleName,
      };
      Share.open(shareOptions).catch((err) => { err && console.log(err); });
    }
  }

  /**
   * 当点击toolBar上的more icon
   */
  onPressToolBarMore() {
    if (isAndroid) {
      this.ActionSheet.show();
    } else {
      ActionSheetIOS.showActionSheetWithOptions({
        options: OPTIONS,
        cancelButtonIndex: CANCEL_INDEX,
      }, this.handlePress);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});