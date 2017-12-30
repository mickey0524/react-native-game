import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  WebView,
} from 'react-native';

import { MyStatusBar } from '../../common/MyStatusBar';
import ToolBar from '../../common/ToolBar';
import { SKY_BLUE } from '../../../conf/color';

export default class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.source = this.props.navigation.state.params.source;
    this.articleName = this.props.navigation.state.params.articleName;
  }

  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar backgroundColor={SKY_BLUE} barStyle={'light-content'} />
        <ToolBar title={this.articleName} navigation={this.props.navigation} isLeftIconShow={true} />
        <WebView
          scalesPageToFit={true}
          source={{ uri: this.source }}
          startInLoadingState={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});