import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import Drawer from '../components/pagelet/Drawer';
import ArticleDetail from '../components/pagelet/Detail/ArticleDetail';
import CardDetail from '../components/pagelet/Detail/GameDetail';
import GameBox from '../components/pagelet/GameBox';
import Theme from '../components/pagelet/Drawer/Theme';
import Setting from '../components/pagelet/Drawer/Setting';
import About from '../components/pagelet/Drawer/About';
import { setTheme } from '../redux/action/theme';

const StackNavigatorConfig = {
  initialRouteName: 'Drawer',
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
};

const Stack = StackNavigator(RouteConfigs, StackNavigatorConfig);

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.setTheme();
  }
  
  render() {
    return (
      <Stack />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTheme: () => dispatch(setTheme()),
  }
}

export default connect(null, mapDispatchToProps)(App);

