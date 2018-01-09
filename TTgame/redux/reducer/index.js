import { combineReducers } from 'redux';

import theme from './theme';
import mode from './mode';
import { 
  netInfo,
  loadImgWithoutWifi,
} from './netInfo';

const rootReducer = combineReducers({
  theme,
  mode,
  netInfo,
  loadImgWithoutWifi,
});

export default rootReducer;