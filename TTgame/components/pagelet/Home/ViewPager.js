import { TabNavigator } from 'react-navigation';
import { PixelRatio } from 'react-native';

import Feed from './Feed';
import Rank from './Rank';

import { SKY_BLUE } from '../../../conf/color';

const dpr = PixelRatio.get();

const RouteConfigs = {
  Feed: {
    screen: Feed,
  },
  Rank: {
    screen: Rank,
  },
};

const TabNavigatorConfig = {
  initialRouteName: 'Feed',
  tabBarPosition: 'top',
  swipeEnabled: true,
  animationEnabled: true,
  lazy: true,
  tabBarOptions: {
    showIcon: false,
    activeTintColor: SKY_BLUE,
    inactiveTintColor: '#000',
    labelStyle: {
      fontSize: 15,
    },
    tabStyle: {
      height: 30,
    },
    style: {
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