import { StackNavigator } from 'react-navigation';

import Feed from '../components/pagelet/Home/Feed/Feed';
import ArticleDetail from '../components/pagelet/Detail/ArticleDetail';
import CardDetail from '../components/pagelet/Detail/GameDetail';

const stackConfig = {
  initialRouteName: 'Feed',
  headerMode: 'none',
  mode: 'card',
};

const App = StackNavigator({
  Feed: { screen: Feed },
  CardDetail: { screen: CardDetail },
  ArticleDetail: { screen: ArticleDetail },
}, stackConfig);

export default App;

