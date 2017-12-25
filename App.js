import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Feed from './components/Feed';
import { ArticleDetail, CardDetail } from './components/Detail';

const App = StackNavigator({
  Feed: { screen: Feed },
  CardDetail: { screen: CardDetail },
  ArticleDetail: { screen: ArticleDetail },
});

export default App;

