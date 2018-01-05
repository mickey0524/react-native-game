import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';

import Home from '../Home';
import DrawerHome from './DrawerHome';
import DrawerMall from './DrawerMall';

const RouteConfigs = {
  Home: {
    screen: Home,
  },
  DrawerHome: {
    screen: DrawerHome,
  },
  DrawerMall: {
    screen: DrawerMall
  },
};

const DrawerNavigatorConfig = {
  drawerWidth: 300,
  drawerPosition: 'left',
  // I had to add the following lines
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
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