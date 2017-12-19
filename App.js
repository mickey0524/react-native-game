import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Feed from './components/Feed';
import Detail from './components/Detail';

const App = StackNavigator({
  Feed: { screen: Feed },
  Detail: { screen: Detail },
});

export default App;

