import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Feed from './components/Feed';
import { ArticleDetail, CardDetail } from './components/Detail';

const App = StackNavigator({
  CardDetail: { screen: CardDetail },
  Feed: { screen: Feed },
  ArticleDetail: { screen: ArticleDetail },
});

export default App;

