import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  WebView,
} from 'react-native';

const Dimensions = require('Dimensions');
let totalWidth = Dimensions.get('window').width;
let totalHeight = Dimensions.get('window').height;

class ArticleDetail extends Component {

  static navigationOptions = {
    title: '游戏文章',
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.source = this.props.navigation.state.params.source;
  }
  
  render() {
    return (
      <View style={styles.container}>
        <WebView
          style={styles.webview} 
          source={{ uri: this.source }}
          startInLoadingState={true} />
      </View>
    );
  }
}

class CardDetail extends Component {
  static navigationOptions = {
    title: '游戏卡片',
  };

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>Card</View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    width: totalWidth,
    height: totalHeight,
  },
});

export {
  ArticleDetail,
  CardDetail,
}

