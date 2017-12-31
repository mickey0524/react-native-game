import { StackNavigator } from 'react-navigation';

// import Feed from '../components/pagelet/Home/Feed/Feed';
import Home from '../components/pagelet/Home';
import ArticleDetail from '../components/pagelet/Detail/ArticleDetail';
import CardDetail from '../components/pagelet/Detail/GameDetail';
import GameBox from '../components/pagelet/GameBox';

const stackConfig = {
  initialRouteName: 'Home',
  headerMode: 'none',
  mode: 'card',
};

const App = StackNavigator({
  Home: { screen: Home },
  CardDetail: { screen: CardDetail },
  ArticleDetail: { screen: ArticleDetail },
  GameBox: { screen: GameBox },
}, stackConfig);

export default App;

