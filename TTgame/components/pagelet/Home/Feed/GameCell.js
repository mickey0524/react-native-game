import React, { Component } from 'react';
// import { connect } from 'react-redux';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import LazyImage from '../../../common/LazyImage';
import { getImgUrl } from '../../../../utils/util';

const totalHeight = Dimensions.get('window').height;

export default class GameCell extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.mode != nextProps.mode ||
      this.props.focusColor != nextProps.focusColor || 
      this.props.contentOffsetY != nextProps.contentOffsetY) { 
      return true;
    }    
    return false;
  }
  
  render() {
    let imgUrl = getImgUrl(this.props.gameInfo.image_list[0], 'FEED_CARD'),
      isNightMode = this.props.mode == 'night';
    return (
      <View style={styles.gameWrap}>
        <Text style={[styles.gameTitle, {color: isNightMode ? '#FFF' : '#222'}]}>
          { this.props.gameInfo.title }
        </Text>
        <LazyImage imgUrl={imgUrl}
          imgStyle={styles.gameImg}
          loadDirection={this.props.loadDirection}
          contentOffsetY={this.props.contentOffsetY} />
        <View style={styles.gameInfo}>
          <Text style={[styles.gameName, {color: isNightMode ? '#FFF' : '#999'}]}>{ this.props.gameInfo.name }</Text>
          <View style={[styles.download, {backgroundColor: this.props.focusColor}]}>
            <Icon name='download' color={'#FFF'} size={8} />
            <Text style={styles.downloadText}>APP下载</Text>
          </View>
        </View>
      </View>
    );
  }
}

// const mapStateTpProps = (state) => {
//   let { theme, mode } = state;
//   return {
//     theme,
//     mode,
//   }
// }

// export default connect(mapStateTpProps)(GameCell);

const styles = StyleSheet.create({
  gameWrap: {
    padding: 15,
  },
  gameTitle: {
    // color: '#222',
    fontSize: 19,
    marginBottom: 8,
  },
  gameImg: {
    width: 345,
    height: 194,
    backgroundColor: '#F4F5F6',
  },
  gameInfo: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameName: {
    fontSize: 12,
    // color: '#999999',
    marginRight: 5,
  },
  download: {
    width: 60,
    height: 14,
    // backgroundColor: '#2A90D7',
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
});
