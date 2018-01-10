import React, { Component } from 'react';
import {
  NetInfo,
} from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import Drawer from '../components/pagelet/Drawer';
import ArticleDetail from '../components/pagelet/Detail/ArticleDetail';
import CardDetail from '../components/pagelet/Detail/GameDetail';
import GameBox from '../components/pagelet/GameBox';
import Theme from '../components/pagelet/Drawer/Theme';
import Setting from '../components/pagelet/Drawer/Setting';
import About from '../components/pagelet/Drawer/About';
import Search from '../components/pagelet/Search';
import { setTheme } from '../redux/action/theme';
import { setMode } from '../redux/action/mode';
import { setLoadImgMode, changeNetInfo } from '../redux/action/netInfo';

const StackNavigatorConfig = {
  initialRouteName: 'Search',
  headerMode: 'none',
  mode: 'card',
};

const RouteConfigs = {
  Drawer: { screen: Drawer },
  CardDetail: { screen: CardDetail },
  ArticleDetail: { screen: ArticleDetail },
  GameBox: { screen: GameBox },
  Theme: { screen: Theme },
  Setting: { screen: Setting },
  About: { screen: About },
  Search: { screen: Search },
};

const Stack = StackNavigator(RouteConfigs, StackNavigatorConfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.netInfoHandler = this.netInfoHandler.bind(this);
  }

  componentWillMount() {
    this.props.setTheme(); //设置主题
    this.props.setMode(); //设置工作模式
    this.props.setLoadImgMode(); //设置loading图片的方式
    NetInfo.getConnectionInfo().then(status => {
      let netInfo = status.type.toLocaleLowerCase();
      netInfo = netInfo == 'wifi' ? 'wifi' : 'nowifi';
      this.props.changeNetInfo(netInfo);
    });
    NetInfo.addEventListener('connectionChange', this.netInfoHandler);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.netInfoHandler);
  }
  
  render() {
    return (
      <Stack />
    );
  }

  /**
   * 处理网络连接改变的情况
   * @param {object} status 网络状况 
   */
  netInfoHandler(status) {
    let netInfo = status.type.toLocaleLowerCase();
    netInfo = netInfo == 'wifi' ? 'wifi' : 'nowifi';
    this.props.changeNetInfo(netInfo);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTheme: () => dispatch(setTheme()),
    setMode: () => dispatch(setMode()),
    setLoadImgMode: () => dispatch(setLoadImgMode()),
    changeNetInfo: (netInfo) => dispatch(changeNetInfo(netInfo)),
  }
}

export default connect(null, mapDispatchToProps)(App);

