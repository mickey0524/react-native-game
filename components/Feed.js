import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArticleOneCell, ArticleThreeCell } from './ArticleCell';
import { GameCell } from './GameCell';

import { FEED } from '../conf/api'; 

const Platform = require('Platform');

export default class Feed extends Component {

  static navigationOptions = {
    title: '今日游戏',
  };

  constructor(props) {
    super(props);
    this.state = {
      feedData: [],
    }
    this.onClickText = this.onClickText.bind(this);
  }

  componentWillMount() {
    let platform = Platform.OS == 'ios' ? '1' : '0';
    let url = `${FEED}&platform=${platform}`;
    fetch(url).then(res => res.json()).then(res => {
      this.setState({
        feedData: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  onClickText() {
    const { navigate } = this.props.navigation;
    navigate('Detail', {});
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.feedData.map((item, index) => {
            return (
              item.type == 'card' && <GameCell key={index} gameInfo={item} />
            );
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  }
});