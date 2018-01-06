import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './router';
import store from './redux/store';

export default class TTgame extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
