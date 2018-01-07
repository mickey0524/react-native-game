import { combineReducers } from 'redux';

import theme from './theme';
import mode from './mode';

const rootReducer = combineReducers({
  theme,
  mode,
});

export default rootReducer;