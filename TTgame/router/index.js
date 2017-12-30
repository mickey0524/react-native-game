import { StackNavigator } from 'react-navigation';

// import Feed from '../components/pagelet/Home/Feed/Feed';
import Home from '../components/pagelet/Home';
import ArticleDetail from '../components/pagelet/Detail/ArticleDetail';
import CardDetail from '../components/pagelet/Detail/GameDetail';

const stackConfig = {
  initialRouteName: 'Home',
  headerMode: 'none',
  mode: 'card',
};

const App = StackNavigator({
  Home: { screen: Home },
  CardDetail: { screen: CardDetail },
  ArticleDetail: { screen: ArticleDetail },
}, stackConfig);

export default App;

