import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import Feed from './Feed';
import Rank from './Rank';
import Hall from './Hall';
import color from '../../../conf/color';
import { dpr } from '../../../conf/deviceParam';

const DefaultTabBar = TabNavigator.Presets['AndroidTopTabs'].tabBarComponent;

const RouteConfigs = {
  Feed: {
    screen: Feed,
  },
  Hall: {
    screen: Hall,
  },
  Rank: {
    screen: Rank,
  },
};

const tabBarComponent = (props) => {
  return (
    <DefaultTabBar {...props}
      style={{backgroundColor: props.theme.themeColor}} />
  )
}

const mapStateToProps = (state) => {
  let { theme } = state;
  return {
    theme,
  }
}

const TabNavigatorConfig = {
  initialRouteName: 'Feed',
  tabBarComponent: connect(mapStateToProps)(tabBarComponent),
  tabBarPosition: 'top',
  swipeEnabled: true,
  animationEnabled: false,
  lazy: true,
  tabBarOptions: {
    showIcon: false,
    activeTintColor: '#FFF',
    inactiveTintColor: '#FFF',
    indicatorStyle: {
      width: 0,
    },
    labelStyle: {
      fontSize: 15,
    },
    tabStyle: {
      height: 40,
    },
    style: {
      elevation: 4,
      height: 40,
      backgroundColor: '#FFF',
      borderBottomWidth: 1 / dpr,
      borderColor: '#D8D8D8',
      borderStyle: 'solid',
    },
  },
};

const TabContainer = TabNavigator(RouteConfigs, TabNavigatorConfig);

export default TabContainer;