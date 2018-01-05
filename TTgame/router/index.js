import { StackNavigator } from 'react-navigation';

import Drawer from '../components/pagelet/Drawer';
import ArticleDetail from '../components/pagelet/Detail/ArticleDetail';
import CardDetail from '../components/pagelet/Detail/GameDetail';
import GameBox from '../components/pagelet/GameBox';

const stackConfig = {
  initialRouteName: 'Drawer',
  headerMode: 'none',
  mode: 'card',
};

const App = StackNavigator({
  Drawer: { screen: Drawer },
  CardDetail: { screen: CardDetail },
  ArticleDetail: { screen: ArticleDetail },
  GameBox: { screen: GameBox },
}, stackConfig);

export default App;

