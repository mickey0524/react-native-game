import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { DrawerNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../Home';
import Theme from './Theme';
import Setting from './Setting';
import color from '../../../conf/color';

const RouteConfigs = {
  Home: {
    screen: Home,
  },
  Theme: {
    screen: Theme,
  },
  Setting: {
    screen: Setting,
  },
};

/**
 * 自定义抽屉页面
 * @param {object} props 传入的属性对象 
 */
const contentComponent = (props) => {
  const { navigate } = props.screenProps; // Drawer传入的外层StackNavigation的navigation
  const closeDrawer = () => { props.navigation.navigate('DrawerClose') }; // 跳转option页面的时候先关闭抽屉
  return (
    <View style={[styles.drawerContainer, { backgroundColor: '#FFF'}]}>
      <View style={styles.userInfo}>
        <Image style={styles.userAvatar} 
          source={{ uri: 'https://p1.music.126.net/6qCTmJ8zClAaBohZ_Fz6fQ==/18534467511417016.jpg?param=100y100'}}/>
        <Text style={styles.userName}>飒然风影</Text>
      </View>
      <View>
        <TouchableWithoutFeedback onPress={() => { closeDrawer(); navigate('Theme') }}>
          <View style={styles.option}>
            <Icon name='md-color-palette' size={23} color={color.SKY_BLUE} />
            <Text style={styles.optionText}>主题</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => { closeDrawer(); navigate('Setting') }}>
          <View style={styles.option}>
            <Icon name='md-options' size={20} color={color.SKY_BLUE} />
            <Text style={styles.optionText}>设置</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => { closeDrawer(); navigate('About') }}>
          <View style={styles.option}>
            <Icon name='ios-megaphone' size={22} color={color.SKY_BLUE} />
            <Text style={styles.optionText}>关于</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const DrawerNavigatorConfig = {
  drawerWidth: 300,
  drawerPosition: 'left',
  initRouteName: 'Home',
  // I had to add the following lines
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  contentComponent: contentComponent,
  contentOptions: {
    activeTintColor: '#000',
    inactiveTintColor: '#000',
  },
};

const Drawer = DrawerNavigator(RouteConfigs, DrawerNavigatorConfig);

export default class DrawerPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Drawer screenProps={this.props.navigation} />
    );
  }
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 150,
    backgroundColor: color.SKY_BLUE,
  },
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    fontSize: 16,
    color: '#FFF',
  },
  option: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 25,
  },
});