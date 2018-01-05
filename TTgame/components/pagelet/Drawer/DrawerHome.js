import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

export default class DrawerHome extends Component {

  static navigationOptions = {
    drawerLabel: 'DrawerHome',
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>asdasd</Text>
      </View>
    );
  }
}