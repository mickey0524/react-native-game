import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

const Platform = require('Platform');

class GameCell extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let imgUrl = this.props.gameInfo.image_list[0].replace('img', 'obj');
    imgUrl = imgUrl.replace('http', 'https');
    return (
      <View style={styles.gameWrap}>
        <Text style={styles.gameTitle}>
          { this.props.gameInfo.title }
        </Text>
        <Image style={styles.gameImg} 
          source={{ uri: imgUrl }}/>
        <View style={styles.gameInfo}>
          <Text style={styles.gameName}>{ this.props.gameInfo.name }</Text>
          <View style={styles.download}>
            <Text style={styles.downloadText}>APP下载</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gameWrap: {
    borderColor: '#F4F5F6',
    borderStyle: 'solid',
    borderTopWidth: 6,
    borderBottomWidth: 6,
    padding: 15,
  },
  gameTitle: {
    color: '#222',
    fontSize: 19,
    marginBottom: 8,
  },
  gameImg: {
    width: 345,
    height: 194,
    marginBottom: 10,
  },
  gameInfo: {
    flex: 1,
    flexDirection: 'row',
  },
  gameName: {
    fontSize: 12,
    color: '#999999',
    marginRight: 7,
  },
  download: {
    width: 60,
    height: 14,
    backgroundColor: '#2A90D7',
    borderRadius: 3,
    overflow: 'hidden',
  },
  downloadText: {
    fontSize: 10,
    color: '#FFF',
    textAlign: 'center',
  }
});

export {
  GameCell,
}