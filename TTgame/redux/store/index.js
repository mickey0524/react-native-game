// import { createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
// import rootReducer from '../reducer/index'
// const middlewares = [thunk]

// export default function configureStore(initialState) {
//   const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer, initialState)
//   return store;
// }

import { createStore, combineReducers, applyMiddleware } from 'redux';
import rootReducer from '../reducer/index'
import thunk from 'redux-thunk';

let enhancer = applyMiddleware(thunk);

var store = createStore(
  rootReducer,
  enhancer,
);

export default store;