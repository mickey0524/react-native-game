import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';

import { isAndroid } from '../../conf/deviceParam';

const STATUSBAR_HEIGHT = isAndroid ? 0 : 20;

class statusBar extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.theme.themeColor != nextProps.theme.themeColor;
  }
  
  render() {
    const { theme } = this.props;
    return (
      <View style={[styles.statusBar, { backgroundColor: theme.themeColor }, isAndroid && { height: 0 }]}>
        <StatusBar translucent backgroundColor={theme.themeColor} barStyle={'light-content'} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  let { theme } = state;
  return {
    theme,
  }
}

const MyStatusBar = connect(mapStateToProps)(statusBar);

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export {
  MyStatusBar,
  STATUSBAR_HEIGHT,
}