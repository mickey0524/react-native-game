import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { SKY_BLUE } from '../../conf/color';

const totalWidth = Dimensions.get('window').width;

export default class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.onPressLeftIcon = this.onPressLeftIcon.bind(this);
  }

  render() {
    return (
      <View style={styles.toolBar}>
        { 
          <Text style={styles.backIconWrap} onPress={() => this.onPressLeftIcon()}>
            {
              this.props.leftIcon == 'back' ?
              <Icon name='md-arrow-back' size={25} color={'#FFF'} /> :
              <Icon name='md-menu' size={25} color={'#FFF' }/>
            }
          </Text>
        }
        <Text style={styles.title} numberOfLines={1}>{this.props.title}</Text>
      </View>
    );
  }

  /**
   * 点击toolbar左端的icon，当左端为back的时候回到上个页面，为menu的时候展开抽屉菜单栏
   */
  onPressLeftIcon() {
    if (this.props.leftIcon == 'back') {
      this.props.navigation.goBack();
    } else {
      this.props.navigation.navigate('DrawerOpen');
    }
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
    lineHeight: 55,
    position: 'absolute',
    left: 15,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    color: '#FFF',
    width: 200,
    textAlign: 'center',
  },
});