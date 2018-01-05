import { StackNavigator } from 'react-navigation';

import Drawer from '../components/pagelet/Drawer';
import ArticleDetail from '../components/pagelet/Detail/ArticleDetail';
import CardDetail from '../components/pagelet/Detail/GameDetail';
import GameBox from '../components/pagelet/GameBox';
import Theme from '../components/pagelet/Drawer/Theme';
import Setting from '../components/pagelet/Drawer/Setting';

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
};

const App = StackNavigator(RouteConfigs, StackNavigatorConfig);

export default App;

