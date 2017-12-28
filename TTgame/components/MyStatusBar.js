import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

class MyStatusBar extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { backgroundColor, ...passThroughProps } = this.props;
    return (
      <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...passThroughProps} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export {
  MyStatusBar,
  STATUSBAR_HEIGHT,
}