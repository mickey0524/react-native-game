import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducer/index'
import thunk from 'redux-thunk';

const enhancer = applyMiddleware(thunk);

const store = createStore(
  rootReducer,
  enhancer,
);

export default store;