import { StackNavigator } from 'react-navigation';

import Feed from '../components/Feed';
import { ArticleDetail, CardDetail } from '../components/Detail';

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

