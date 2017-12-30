import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

import { getImgUrl } from '../../../../utils/util';

class GameCell extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let imgUrl = getImgUrl(this.props.gameInfo.image_list[0], 'FEED_CARD');
    return (
      <View style={styles.gameWrap}>
        <Text style={styles.gameTitle}>
          { this.props.gameInfo.title }
        </Text>
        <Image style={styles.gameImg} 
          source={{ uri: imgUrl }} />
        <View style={styles.gameInfo}>
          <Text style={styles.gameName}>{ this.props.gameInfo.name }</Text>
          <View style={styles.download}>
            <Image source={require('../../../../assets/download.png')} style={styles.downloadIcon} />
            <Text style={styles.downloadText}>APP下载</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gameWrap: {
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
    backgroundColor: '#F4F5F6',
  },
  gameInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameName: {
    fontSize: 12,
    color: '#999999',
    marginRight: 5,
  },
  download: {
    width: 60,
    height: 14,
    backgroundColor: '#2A90D7',
    borderRadius: 3,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  downloadText: {
    fontSize: 10,
    color: '#FFF',
    textAlign: 'center',
  },
  downloadIcon: {
    width: 8,
    height: 8,
  },
});

export {
  GameCell,
}