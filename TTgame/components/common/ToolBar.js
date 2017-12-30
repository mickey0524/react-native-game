import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { SKY_BLUE } from '../../conf/color';

const totalWidth = Dimensions.get('window').width;

export default class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.onPressBackIcon = this.onPressBackIcon.bind(this);
  }

  render() {
    return (
      <View style={styles.toolBar}>
        { this.props.isLeftIconShow && 
          <Text style={styles.backIconWrap} onPress={() => this.onPressBackIcon()}>
            <Image source={require('../../assets/back.png')} 
              style={styles.backIcon} />
          </Text>
        }
        <Text style={styles.title} numberOfLines={1}>{this.props.title}</Text>
      </View>
    );
  }

  onPressBackIcon() {
    this.props.navigation.goBack();
  }
}

const styles = StyleSheet.create({
  toolBar: {
    width: totalWidth,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SKY_BLUE,
  },
  backIconWrap: {
    width: 40,
    height: 50,
    lineHeight: 40,
    position: 'absolute',
    left: 15,
    textAlign: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 20,
    color: '#FFF',
    width: 200,
    textAlign: 'center',
  },
});